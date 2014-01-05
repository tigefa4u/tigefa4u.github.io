---
layout: post
title: "A side effect of boolean parameters in Ruby"
description: "This post describes side effect of having boolean arguments in Ruby methods. It shows how it can be elegant and confusion at the same time"
tags: [ruby]
---

In this post I will show you how it can be confusing to have method which accepts boolean variables. This approach which is a little bit complicated but much robust and can be acceptable in applications with high requirements of security.

## The problem

Say we have a method `destroy` which accepts boolean argument `forced` which says how to destroy object:

{% highlight ruby %}
def destroy(forced = false)
  forced ? forced_destroy : soft_destroy
end
{% endhighlight %}

And this is a version of simplified version of `forced_destroy` and `soft_destroy` methods respectively:

{% highlight ruby %}
def forced_destroy
  puts 'forced destroy...'
end

def soft_destroy
  puts 'soft destroy...'
end
{% endhighlight %}

For the first glance this code looks precise and doesn't have any pitfalls or side effects. We can use it rather simple and have expected behavior what we want from this method:

{% highlight ruby %}
>> destroy(true)  # => forced destroy...
>> destroy(false) # => soft destroy...
{% endhighlight %}

But really because of typeless *Ruby* nature we can pass in the method argument of any type. And knowing that *Ruby* treats `nil` as `false` and any other value as `true` we will have this behavior:

{% highlight ruby %}
>> destroy(:forced) # => forced destroy...
>> destroy(nil)     # => soft destroy...
>> destroy(:soft)   # => forced destroy...
{% endhighlight %}

So here is a Ruby side efect or feature (who knows). On the one hand it's convenient to have this behavior - we can have readable code (look at `destroy(:forced)`) but on the other hand we can't pass there human `:soft` argument. Actually it's possible but as you see we have unexpected behavior for human. Also if you prefer to use this Ruby feature you have to be prepared for changes - what will be if `destroy` method implementation will be changed in the feature to something like this:

{% highlight ruby %}
def destroy(forced = false)
  forced == true ? forced_destroy : soft_destroy
end
{% endhighlight %}

The code where you do call `destroy(:forced)` will fail and it can be in many cases. Some time ago I saw that this ability was used in `ActiveRecord` in some internals feature. It's really confusing when you see it for the first time. Refuse this approach.

But the code `destroy(true)` or `destroy(false)` looks confusing. What does mean `true` or `false` here? To be completely sure you have to see method documentation or see the method  implementation every time when you are going to use this method. It looks like boring way.

## Escape

I see here only one solution how to avoid pitfalls and misconceptions - use Hash options:

{% highlight ruby %}
def destroy(options = {:forced => false})
  # set to false if there is no passed `:forced` option and translate it to the boolean variable
  forced = options.fetch(:forced) { false }

  raise ArgumentError, ':forced option should be true or false' unless [true, false].include?(forced)

  forced ? forced_destroy : soft_destroy
end
{% endhighlight %}

On this way we can call method by human readable code: `destroy(:forced => true)` or `destroy(:forced => false)`. To avoid collisions I filtered option `:forced` to accept only `true` or `false`. That's why we are going to replace typeless language with language with static types like Java. If you have code like above in your application it's a sign to refactor it or change application architecture.

So the preferable variant is this:

{% highlight ruby %}
def destroy(options = {:forced => false})
  options[:forced] ? forced_destroy : soft_destroy
end
{% endhighlight %}

It looks like the first variant but method calls are more readable: `destroy(:forced => true)` or `destroy(:forced => false)`.

## Conclusion

Just remember about boolean arguments in Ruby and their side effects. Write concise readable code and someone will thank you ever for it.
