---
layout: post
title: "Run old migrations in the new migrations"
description: "This post describes steps of using old migrations in the new migrations which you have just created and need to write code which you have already wrote in the older migrations."
tags: [rails, active_record, migrations]
---

Imagine you have to write new migration with a lot of code and this migration should have a lot of code, code which you have already wrote in older migration and this required code is exactly up/down/change part of those migration. Another words you would like to run migration part (up, down or change) in the new migration. Pay attention - you have to write or copy paste a lot of code You have 2 variants how to overcome this issue:

1. The simplest and boring solution - it is copy and paste this code, or write it with scratch. This is not our case. Old code and new code will mix and you will have a huge amount of disgusting code - you won't able to detect which is new code and which is old
2. Use oldest migration in DRY way. Just use those code as you use another class, for instance `User` model which you probably have

## Input data

In one project I had to rollback my old migration which has a lot of code. Check out this code:

> db/migrate/20121107173946_add_search_content_to_products.rb

{% highlight ruby %}
class AddSearchContentToProducts < ActiveRecord::Migration
  def up
    add_column :products, :tsvector_content_tsearch, :tsvector
    add_column :products, :tsvector_content_dmetaphone, :tsvector

    execute <<-EOS
      CREATE INDEX products_tsvector_content_tsearch_idx ON products USING gin(tsvector_content_tsearch);
      CREATE INDEX products_tsvector_content_dmetaphone_idx ON products USING gin(tsvector_content_dmetaphone);
    EOS

    execute <<-EOS
      CREATE OR REPLACE FUNCTION get_tsvector(c text, w "char", lang regconfig DEFAULT 'pg_catalog.russian') RETURNS tsvector LANGUAGE plpgsql AS $$
      begin
        return setweight(to_tsvector(lang, coalesce(c, '')), w);
      end
      $$;
    EOS

    execute <<-EOS
      CREATE OR REPLACE FUNCTION products_trigger() RETURNS trigger LANGUAGE plpgsql AS $$
      declare
        product_model record;
        product_part record;
        product_brand record;
        product_seller record;

      begin
        select name, aliases, brand_id into product_model from models where id = new.model_id;
        select name, aliases into product_brand from brands where id = product_model.brand_id;
        select name, aliases into product_part from parts where id = new.part_id;
        select email, name into product_seller from sellers where id = new.seller_id;

        new.tsvector_content_tsearch :=
          get_tsvector(new.note, 'C') ||

          get_tsvector(product_model.name, 'A') ||
          get_tsvector(product_model.aliases, 'A') ||

          get_tsvector(product_part.name, 'A') ||
          get_tsvector(product_part.aliases, 'A') ||

          get_tsvector(product_brand.name, 'A') ||
          get_tsvector(product_brand.aliases, 'A') ||

          get_tsvector(product_seller.name, 'D') ||
          get_tsvector(product_seller.email, 'D');

        new.tsvector_content_dmetaphone :=
          get_tsvector(new.note, 'C', 'simple') ||

          get_tsvector(product_model.name, 'A', 'simple') ||
          get_tsvector(product_model.aliases, 'A', 'simple') ||

          get_tsvector(product_part.name, 'A', 'simple') ||
          get_tsvector(product_part.aliases, 'A', 'simple') ||

          get_tsvector(product_brand.name, 'A', 'simple') ||
          get_tsvector(product_brand.aliases, 'A', 'simple') ||

          get_tsvector(product_seller.name, 'D', 'simple') ||
          get_tsvector(product_seller.email, 'D', 'simple');

        return new;
      end
      $$;
    EOS

    execute <<-EOS
      CREATE TRIGGER products_content_to_search_trigger BEFORE INSERT OR UPDATE
        ON products FOR EACH ROW EXECUTE PROCEDURE products_trigger();
    EOS

    Product.all.each(&:touch)
  end

  def down
    remove_column :products, :tsvector_content_tsearch
    remove_column :products, :tsvector_content_dmetaphone

    execute <<-EOS
      DROP TRIGGER products_content_to_search_trigger ON products;
      DROP FUNCTION products_trigger();
      DROP FUNCTION get_tsvector(c text, w "char", lang regconfig);
    EOS
  end
end

{% endhighlight %}

As I have already said I would like to rollback it in my new migration on up.
Write new migration and paste there this code is not right solution. I think you are agreed with me.

## Solution

I think the best solution will be to include this migration in my new migration then use this migration class as usual code (yes - migration is a class too and we are able to do it). So the final code below:

{% highlight ruby %}
require File.join(Rails.root, 'db/migrate/20121107173946_add_search_content_to_products.rb') # (1)

class ChangeSearchFunctions < ActiveRecord::Migration
  def up
    AddSearchContentToProducts.new.down # (2)

    add_column :products, :search_vector, :tsvector

    execute <<-EOS
      CREATE INDEX products_search_vector_idx ON products USING gin(search_vector);

      CREATE FUNCTION get_tsvector(c text, lang regconfig DEFAULT 'russian'::regconfig) RETURNS tsvector
      LANGUAGE plpgsql
      AS $$
        begin
          return to_tsvector(lang, coalesce(c, ''));
        end
        $$;

      CREATE FUNCTION products_trigger() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
        declare
          product_model record;
          product_part record;
          product_brand record;
          product_seller record;

        begin
          select name, aliases, brand_id into product_model from models where id = new.model_id;
          select name, aliases into product_brand from brands where id = product_model.brand_id;
          select name, aliases into product_part from parts where id = new.part_id;
          select email, name into product_seller from sellers where id = new.seller_id;

          new.search_vector :=
            get_tsvector(new.note) ||

            get_tsvector(product_model.name) ||
            get_tsvector(product_model.aliases) ||

            get_tsvector(product_part.name) ||
            get_tsvector(product_part.aliases) ||

            get_tsvector(product_brand.name) ||
            get_tsvector(product_brand.aliases) ||

            get_tsvector(product_seller.name) ||
            get_tsvector(product_seller.email);

          return new;
        end
        $$;

      CREATE TRIGGER products_content_to_search_trigger BEFORE INSERT OR UPDATE
        ON products FOR EACH ROW EXECUTE PROCEDURE products_trigger();
    EOS
    Product.find_each(&:touch)
  end

  def down
    remove_column :products, :search_vector

    execute <<-EOS
      DROP TRIGGER products_content_to_search_trigger ON products;
      DROP FUNCTION products_trigger();
      DROP FUNCTION get_tsvector(c text, lang regconfig);
    EOS

    AddSearchContentToProducts.new.up # (3)
    Product.find_each(&:touch)
  end
end
{% endhighlight %}

See the first line (1): `require File.join(Rails.root, 'db/migrate/20121107173946_add_search_content_to_products.rb')`. With this line I include migration file and after this we are able to use old migration's class. On the fifth line (2) we I just use it: `AddSearchContentToProducts.new.down` to rollback old migration. On down I have to up this migration, see mark (3): `AddSearchContentToProducts.new.up`.

In this example I had to rewrite stored procedure for postgresql database and I've got clean and DRY solution as you can see. Imagine how many code I would have if I just pasted all entire migration in the new! I hope you will find this article useful and if you have issues like I had you won't have problems now to solve them.

UPDATE 26.06.2013: In Rails 4 new method is appeared which allows to revert all migrations. Check it out:

```ruby
require_relative '2012121212_example_migration'

class FixupExampleMigration < ActiveRecord::Migration
  def change
    revert ExampleMigration

    create_table(:apples) do |t|
      t.string :variety
    end
  end
end
```
