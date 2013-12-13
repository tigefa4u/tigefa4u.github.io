---
layout: post
title: "Advanced Rails model generators"
description: "Check out how the rails generators are awesome. In this post you will read how to use rails model generators for 100%"
tags: [rails]
---
{% include JB/setup %}

There are some people who give advice to not use rails generators and create models, controllers and etc. things manually. I don't agree with them and my advice here is to figure out deeply how they work and then make conclusion.

In this post I will describe the most often and useful generator - it's a model generator. I bet if you don't use rails generators yet this post will make you to change your work. Using Rails generators saves your time, increases performance, helps to get consistent data for your application.

## Basic usage

Let's start with simple example:

    $ rails g model user email

This command will generate *user* model with *email* field type of *string*, migration which creates *users* table, test for model and factory (if you have it). You are able to generate model with few fields like this:

    $ rails g model user first_name last_name email

This example will generate yet model with 3 string fields: first_name, last_name and email.

If you want to have model with different type of string pass type after field name following by : and type. Example:

    $ rails g model user email age:integer

The whole list of available types:

    integer
    primary_key
    decimal
    float
    boolean
    binary
    string
    text
    date
    time
    datetime
    timestamp

You are able to pass *--option* parameter to generator. It will inherit generating class from passed name to achieve STI (sing table inheritance):

    $ rails g model admin --parent user

This example generates model:

{% highlight ruby %}
class Admin < User
end
{% endhighlight %}

Interesting fact that if you generate model in some scope passing model like *admin/user* or *Admin::User*:

    $ rails g model admin/user

you will get generated model in scope *app/models/admin/user.rb*, defined scope *app/models/admin.rb* which is requred to define module. Let's see to the content of generated module:

{% highlight ruby %}
module Admin
  def self.table_name_prefix
    'admin_'
  end
end
{% endhighlight %}

It means that generated table name for *Admin::User* starts with prefix *admin_users*. This feature allows to have separated namespaced models as in rails code as in db schema. Very convenient and useful feature for multimodule applications for my opinion.

## Advanced usage

Sometimes you have to automatically add index for columns in your migration. It's not a problem:

    $ rails g model user email:index location_id:integer:index

Or uniq index:

    $ rails g model user pseudo:string:uniq

Set limit for field of integer, string, text and binary fields:

    $ rails generate model user pseudo:string{30}

Special syntax to generate decimal field with scale and precision:

    $ rails generate model product 'price:decimal{10,2}'

> Pay attention that you have to wrap parameter `price:decimal{10,2}` to quotes. It's vital and you may have incorrect behavior of generator if you don't do it. Full explanation of this case is [here](https://github.com/rails/rails/pull/12642).

You can combine any single curly brace option with the index options:

    $ rails generate model user username:string{30}:uniq

And the last useful feature of generators - it's options to generate reference columns (fields which are used in rails as foreign keys):

    $ rails generate model photo album:references

This command will generate *photos* table with integer field *album_id* and also it will add index for this field automatically. Make sure in it by looking at generated migration:

{% highlight ruby %}
class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :album

      t.timestamps
    end
    add_index :photos, :album_id
  end
end
{% endhighlight %}

For polymorphic reference use this syntax:

    $ rails generate model product supplier:references{polymorphic}

Polymorphic reference with indexes:

    $ rails generate model product supplier:references{polymorphic}:index


## Conclusion

As you see there a lot of useful things in rails model generator which can decrease your developing time. Thank you for reading this trolling post but anyway I hope you find it useful because I didn't find any similar post or literature which describes rails model generator fully.

PS. Foundation for this post was got from [this](https://github.com/rails/rails/blob/master/railties/lib/rails/generators/rails/model/USAGE) rails description usage which is located only in sources of rails on github.
