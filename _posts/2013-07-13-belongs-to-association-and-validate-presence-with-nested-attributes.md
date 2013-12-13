---
layout: post
title: "Rule #2 to validate belongs_to association for presence"
description: "If you have troubles with validations for belongs_to association presence when nested params went for form? I had the same problem recently and in this post I will share idea with you how to challenge it"
tags: [rails, belongs_to, validator, nested_form]
---
{% include JB/setup %}

Recently I've resolved one more problem which concerns presence validator and *belongs_to* association. But it's involved another thing - *accepts_nested_attributes*. Assume you have nested form and parent object is not exist yet, so you can have this issue. Here I will show you how to fix it.

## Issue

Let's we have the following models and their relations:

{% highlight ruby %}
class Account
  has_one :user
  accepts_nested_attributes_for :user
end

class User
  belongs_to :account
  validates :account, :presence => true
end
{% endhighlight %}

Go to *rails console* and check the validator out:

{% highlight ruby %}
irb(main):001:0> params = {:account => {:user_attributes => {}}}
irb(main):002:0> a = Account.new(params[:account])
irb(main):003:0> a.valid? # => false
irb(main):004:0> a.errors.full_messages # => ["User account can't be blank"]
{% endhighlight %}

So this is an our challenge - we can't save account, because user can't pass validation rules because account (parent model) is not existed yet! But to remove validator won't be right solution. Are you agree with me?


## Solution

A solution for this issue is very simple - just add to *has_one* (or if you have *has_many*) one more option - *:inverse_of*. With this option *rails* won't try to get account from database when user is validated. The account will be got from memory. If you don't familiar with this option I strongly recommend you to read an official [rails guide](http://guides.rubyonrails.org/association_basics.html#options-for-belongs-to-inverse-of).

So, change account model try it:

{% highlight ruby %}
class Account
  has_one :user, :inverse_of => :account
  accepts_nested_attributes_for :user
end
{% endhighlight %}

{% highlight ruby %}
irb(main):001:0> params = {:account => {:user_attributes => {}}}
irb(main):002:0> a = Account.new(params[:account])
irb(main):003:0> a.valid? # => true
{% endhighlight %}

I hope this article was helpful for you.
