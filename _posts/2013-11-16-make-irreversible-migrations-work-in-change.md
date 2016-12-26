---
layout: post
title: "Make irreversible migration work on change of migration"
description: "Rails raises ActiveRecord::IrreversibleMigration when it
can't do it. Since Rails 4 released there is a solution to avoid
it."
categories: ruby
tags: [rails, migrations]
---

In Rails 2 in migrations there were only 2 methods: `up` and `down`. They are
called on running migrations up and down respectively with rake tasks `rake db:migrate`
and `rake db:rollback`. In `up` method of migration definition you had to write
code which is called only on running migration forward and in down - the code
which is called only on rolling migration back. For example, if you create table
on up you had to drop it manually on rolling back. Rails 3 produced us great method
`change` which allowed us to write there code which creates a table and drops the
table automatically on rolling migration back. This really great step forward
and thankfully it's exist in Rails 4 still. But unfortunately there was a problem - you didn't
have opportunity to say "don't run this peace of code on down but run this
only on up". So the solution was just to use old syntax. Since Rails 4 has released
there is a feature to fix this situation.

## Reversible

How would you write migration which should add new column on up and
fill all records in table only on up, and only delete this column on
down? I bet that in Rails 3 you would write it like this:

{% highlight ruby %}
def up
  add_column :users, :location, :string
  User.update_all(location: 'Minsk')
end

def down
  remove_column :users, :location
end
{% endhighlight %}

You had to avoid using `change` method which allows to save some time.
For example, if you didn't need to update column value immediately
after it's adding you would cut this code down to like this:

{% highlight ruby %}
def change
  add_column :users, :location, :string
end
{% endhighlight %}

And that's it. On up it will add column to table and remove it on
down. Much less code and it's a profit.

Rails 4 provides us one more useful way to write what we need in one
place:

{% highlight ruby %}
def change
  add_column :users, :location, :string
  reversible do |direction|
    direction.up { User.update_all(location: 'Minsk') }
  end
end
{% endhighlight %}

Check out the original
[documentation](http://api.rubyonrails.org/classes/ActiveRecord/Migration.html#method-i-reversible).
