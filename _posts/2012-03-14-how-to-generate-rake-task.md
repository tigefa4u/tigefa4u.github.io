---
layout: post
title: "How to generate rake task"
description: "Ruby on Rails guides for generate rake task. If you want to write new rake task you can use rails generate task generator. It is Ruby On Rails generator which generates scaffold for the rake task"
tags: [ruby, rails, rake]
---
{% include JB/setup %}

Have you ever written your own __rake tasks__? If you write them very often this post will be very usefull for you. I wont describe what is __rake task__ here because there are a lot of information about it yet. I will tell you how to easy _generate_ __rake task__.

Today I found interesting generator in __Ruby On Rails__. I have never read about it in any post, doc, book or tutorial, I have never seen it in any sceencast, I've never heart about it from any podcast and I wondered that Google doesn't tell me nothing about it. So I decided to write about it here.

If you want to write your own __rake task__ you have 2 ways to do it (I thought so beafore):

1. Write it from scratch
2. Copy-paste code from another ready __rake task__ and change code to required

But there is a 3rd way to do it. Just use this __rake generator__:

	$ rails g task my_namespace my_task1 my_task2
	$ create lib/tasks/my_namespace.rake

It will generate scaffold for our new __rake task__:
>lib/tasks/my_namespace.rake

{% highlight ruby %}
namespace :my_namespace do
  desc "TODO"
  task :my_task1 => :environment do
  end

  desc "TODO"
  task :my_task2 => :environment do
  end
end
{% endhighlight %}

It is awesome! And now you can write here your code for new __rake tasks__.

Let's make sure these __rake tasks__ are exist and we are able to use them:

	$ rake -T | grep my_namespace
	rake my_namespace:my_task1  # TODO
	rake my_namespace:my_task2  # TODO

Perfect! As you can see it is very easy to write your own __rake task__. It is easier as you do it before. Thanks for reading!