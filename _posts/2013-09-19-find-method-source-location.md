---
layout: post
title: "How to find the method definition in Ruby"
description: "This post describes how to get location (file and line) where method is defined. When its impossible and what to do to avoid losing location of method definition."
tags: [ruby]
categories: ruby
---

For the first glance it seems rather easy problem to find method definition. You know class name for the object, open documentation for this class and read it. But in real life it's no so simple as seems. In Ruby the method for object can be defined from many places: modules, inheritance, meta-programming, other language's extensions and etc. Imagine that you have installed a lot of gems in your application and every gem potentially can define or redefine method on any object. How to find the method definition in this situation?

## Source location

Getting location of method definition is rather simple. Assume you have class `A` defined in the `a.rb` like this:

> a.rb

{% highlight ruby %}
class A
  def m
  end
end
{% endhighlight %}


In Ruby each method is an object too and you can get it using method with called `#method`. It returns object of class `Method`:

{% highlight ruby %}
m = A.new.method(:m) #=> #<Method: A#m>
{% endhighlight %}

Object of class `Method` has '#source_location' method which returns the file where the method defined and the line:

{% highlight ruby %}
m.source_location #=> => ["/Users/ka8725/sl/a.rb", 2]
{% endhighlight %}

Now we know where the method is defined, open this file and see how it' implemented. The method doesnt work for methods which are defined with other languages extensions:

{% highlight ruby %}
{}.method(:[]).source_location #=> nil
{% endhighlight %}

And pay attention that methods which are defined by meta-programming can lose their source location too:

> b.rb

{% highlight ruby %}
class B
  class_eval <<-M
    def m
    end
  M
end

B.new.method(:m).source_location #=> ["(eval)", 1]
{% endhighlight %}

Avoid missing line this way:

> b.rb

{% highlight ruby %}
class B
  class_eval <<-M, __FILE__, __LINE__
    def m
    end
  M
end

B.new.method(:m).source_location #=> ["/Users/ka8725/sl/activebilling/b.rb", 5]
{% endhighlight %}


Feel free to use `#define_method` - it doesn't lose its source location. But if method appears on the object with `#method_missing` help it cant know anything about its definition place.

## Practical application

Recently I had a problem in our Rails application. I defined `Resource` model `ResourcesController` and as usual its routes but there was surprise when I opened page which contained this helper: `link_to 'Resource', resource_path(@resource)`. This code caused exception `SystemStackError - stack level too deep`. Rather strange situation, isn't it? Going through sources of Rails I didn't find any collisions there but finally with `Method#source_location` help I found the source of this method definition (it's [inherited_resources](https://github.com/josevalim/inherited_resources) gem which we use) and as a result I [patched this gem](https://github.com/josevalim/inherited_resources/pull/318). I would say that patch is good but at least it looks logical.

## Conclusion

No doubt that `Method#source_location` method is very helpful. But sometimes it can be useless whatever. So the conclusion here is avoid using `#method_missing` (there are many reasons to avoid it and this is one of the all cases).