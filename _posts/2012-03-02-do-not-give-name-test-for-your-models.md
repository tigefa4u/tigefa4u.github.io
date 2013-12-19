---
layout: post
title: "Do not give name Test for your models"
description: "Ruby on Rails guides for strange situation with name Test for models. There are many reasons to do not give name Test for your models in Ruby On Rails. Validates uniqueness in scope test_id does not work. There is a already Test module in Ruby On Rails"
tags: [ruby, rails, active record, reserved_words]
---
{% include JB/setup %}

There is a list of reserved words for Ruby On Rails framework. Full list is [here](http://oldwiki.rubyonrails.org/rails/pages/ReservedWords).
But it doesnt contain at least one word which I will describe in this post. There are many reasons to don't give name **Test** for your _models_ in _Ruby On Rails_.
I will try to describe in this post problems which you will have if you have _model_ with **Test** name.

![Do not give name Test for your models](/images/do_not_give_test_name_for_models.jpg)

Let's start with creating new application:

    ~$ rails new test_app --skip-test-unit --old-style-hash --skip-javascript --skip-bundle --skip-git
    ~$ cd test_app
    ~/test_app$ bundle install

Make _models_ **Test** and **TestPart**:

    test_app$ rails g model test name:string
    test_app$ rails g model test_part name:string test_id:integer
    test_app$ rake db:migrate


## Reason 1: Test is not a class. It is a module!

I want to debug my code. So I'm going to _rails console_ by typing **rails c** in terminal and trying to
find all **Test** instances in my _database_ (I did't create one that way I have to get blank _collection_):

    irb(main):001:0> Test.all
    NoMethodError: undefined method `all' for Test:Module

What is happened? I'm trying to get all _tests_ in my _db_ but I get error instead of empty _collection_.
We will find out for this question in _rails console_:

    irb(main):002:0> Test.class
    => Module

This is a _module_ but not a _class_ how we expected. _Module_ **Test** exist in **TestUnit** and even we aren't using
**TestUnit** in our application we will have this confusion. To avoid this negative situation we can rename _class_ **Test** to
**MyTest** for example. Let's do it manually:

    test_app$ mv app/models/test.rb app/models/my_test.rb

Remember if we have _model_ **MyTest** it would connect with _table_
**my_tests** but we don't have this _table_. So we have 2 ways to solve this problem:

1. Rename _table_ **tests** to **my_tests**. We should create new migration to do it
2. Set custom _table name_ for _model_ **MyTest**. In our case it is **tests**

I will use 2nd variant because it will take less time:

> app/models/my_test.rb

{% highlight ruby %}
class MyTest < ActiveRecord::Base
  self.table_name = 'tests'
end
{% endhighlight%}

> You must use here **self.table_name** but not **table_name =**. It won't give expected effect in another case.

Try to test what we did and how it works now:

{% highlight ruby %}
    {{ruby}}
    irb(main):003:0> reload! # we have changes in code so we have to reload console to get changes here
    irb(main):004:0> MyTest.all
      MyTest Load (0.1ms)  SELECT "tests".* FROM "tests"
    => []
{% endhighlight%}

And, yes! It's working now correctly!

## Reason 2: validates uniqueness in scope

Assume **MyTest** has_many **TestPart**s and **TestPart** belongs to **MyTest**:

> app/motest/test_part.rb

{% highlight ruby %}
class TestPart < ActiveRecord::Base
  attr_accessible :name, :test_id
  belongs_to :test, :class_name => 'MyTest'
end
{% endhighlight %}

> app/models/my_test.rb

{% highlight ruby %}
class MyTest < ActiveRecord::Base
  attr_accessible :name
  self.table_name = 'tests'
  has_many :test_parts, :foreign_key => 'test_id'
end
{% endhighlight %}

Check it out:

    irb(main):009:0> reload!
    irb(main):010:0> t = MyTest.new(:name => 'My first test')
    => #<MyTest id: nil, name: "My first test", created_at: nil, updated_at: nil>
    irb(main):011:0> t.test_parts.build(:name => 'Test part 1')
    => #<TestPart id: nil, name: "Test part 1", test_id: nil, created_at: nil, updated_at: nil>
    irb(main):012:0> t.test_parts.build(:name => 'Test part 2')
    => #<TestPart id: nil, name: "Test part 2", test_id: nil, created_at: nil, updated_at: nil>
    irb(main):013:0> t.save
    => true
    irb(main):014:0> t.test_parts
    => [#<TestPart id: 1, name: "Test part 1", test_id: 1, created_at: "2012-03-02 22:49:51", updated_at: "2012-03-02 22:49:51">, #<TestPart id: 2, name: "Test part 2", test_id: 1, created_at: "2012-03-02 22:49:51", updated_at: "2012-03-02 22:49:51">]

Perfect! Everything is working.

Let's try to add validation for test parts name's uniqueness in scope **test_id**:

> app/motest/test_part.rb

{% highlight ruby %}
class TestPart < ActiveRecord::Base
  attr_accessible :name, :test_id
  belongs_to :test, :class_name => 'MyTest'
  validates :name, :uniqueness => {:scope => :test_id}
end
{% endhighlight %}

Try to save the same test partials to my test:

    irb(main):016:0> reload!
    irb(main):017:0> t = MyTest.create(:name => 'My second test')
    => #<MyTest id: 2, name: "My second test", created_at: "2012-03-02 23:06:30", updated_at: "2012-03-02 23:06:30">
    irb(main):018:0> t.test_parts.build(:name => 'Test part')
    => #<TestPart id: nil, name: "Test part", test_id: 2, created_at: nil, updated_at: nil>
    irb(main):019:0> t.test_parts.build(:name => 'Test part')
    => #<TestPart id: nil, name: "Test part", test_id: 2, created_at: nil, updated_at: nil>
    irb(main):020:0> t.save
    => true
    irb(main):021:0> t.test_parts
    => [#<TestPart id: 3, name: "Test part", test_id: 2, created_at: "2012-03-02 23:06:56", updated_at: "2012-03-02 23:06:56">, #<TestPart id: nil, name: "Test part", test_id: 2, created_at: nil, updated_at: nil>]

Ooops! We have trouble here. We added _uniqueness validation_ for _name_ field _test parts_ and we should able to save **only one** test part with
same name for _my test_. But... we did it!

To fix this problem we have 2 ways:

1. Rename table **tests** to **my_tests** and remove line `self.table_name = 'tests'` from `app/models/my_test.rb`
2. Rename colum **test_id** to **my_test_id** and fix code according this changing: use everywhere **test_id** instead of **my_test_id** in application

I think it is very important to find this bugs in your application before you started write it and use in production. So I hope these rails confusions
described in my post will help you to avoid problems with coding in the future.

That's it what I wanted to tell you today. See you in next posts!