---
layout: post
title: "Returning method"
description: "Ruby On Rails has beautiful method which can help you clean up your code. It is returning method"
tags: [ruby, rails]
---
{% include JB/setup %}

Have you ever write code on **Ruby On Rails** with this use cases?

1. Initialize **object** which will contain **result** of the method (**the resulting object**)
2. Change **the resulting object** with some operations and the last operation might be **nil**
3. Retun **the resulting object** from the first step. You should do it because you have to return **not** result of last operation **and** object which you manipulated with, ie **the resulting object**

> There are a lot of 'the resulting object' references. Don't they?

If your answer is *yes* this post is especially for you.

#How to use clean up the code?

Assume that you have method like I have already written above:

{% highlight ruby %}
def my_action
  res = []
  res << 'item 1'
  res << 'item 2'
  #…some code like two lines above
  res << 'item n'
  res
end
{% endhighlight %}

The is a perfect method in Ruby On Rails - **returning**. According **rdoc** we can clean up our code like this:

{% highlight ruby %}
def my_action
  returning res = [] do
    res << 'item 1'
    res << 'item 2'
    #…some code like two lines above
    res << 'item n'
  end
end
{% endhighlight %}

or like this:

{% highlight ruby %}
def my_action
  returning [] do |res|
    res << 'item 1'
    res << 'item 2'
    #…some code like two lines above
    res << 'item n'
  end
end
{% endhighlight %}

The result of method **my_action** will be modified array. It doesn't matter which approach to use: first or second.
Choose which one you would like. So this code looks a little bit better then repetitive code which was before.

## Fail

But there is a one *pitfall*. Let's try to use it like this:

{% highlight ruby %}
class Order < ActiveRecord::Base
  # ...
  def self.search(params)
    returning orders = self do
      orders = orders.scoped(:conditions => {:service_type => params[:service_type]}) if params[:service_type].present?
      orders = orders.scoped(:conditions => ['orders.created_at >= ?', params[:date_range_start]]) if params[:date_range_start].present?
      orders = orders.scoped(:conditions => ['orders.created_at <= ?', params[:date_range_end]]) if params[:date_range_end].present?
    end
  end
  # ...
end
{% endhighlight %}

 You will wonder that it doesn't work as code like in *my_action*! We have changed **reference** for local object **orders**. That's why we will have unexpected result: **self** instead of scope object (assume we passed **:service_type** parameter for instance, ie we called method: *Order.search(:service_type => 'test')*). We can use method **returning** here, so right code should be this:

{% highlight ruby %}
# ...
def self.search(params)
  orders = self
  orders = orders.scoped(:conditions => {:service_type => params[:service_type]}) if params[:service_type].present?
  orders = orders.scoped(:conditions => ['orders.created_at >= ?', params[:date_range_start]]) if params[:date_range_start].present?
  orders = orders.scoped(:conditions => ['orders.created_at <= ?', params[:date_range_end]]) if params[:date_range_end].present?
  orders
end
# ...
{% endhighlight %}

## Conclusion

 So the conclusion of this post is to use method **returning** if you have initialized one object and do some changes and then return it. But be attentive: **If you change reference for returning object to new object you will have result with old one.**

> Attention! Method returning provided ONLY Ruby On Rails, but NOT Ruby!
