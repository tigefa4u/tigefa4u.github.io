---
layout: post
title: "Do you test your rake tasks?"
description: "This post explains how to test custom rake tasks in the Rails application"
tags: [rails, rake, rspec]
---
{% include JB/setup %}

I think that many of you think that writing tests for custom rake tasks is a redundant thing.
But as practice shows if you think so you are wrong.
In this post I will show how to test **custom rake tasks**.

# Issue

Assuming that we have **rake task** for example *products:load*, and you can run it from the terminal by the following command: `rake products:load`.
At first glance you could test it manually on running `spec`, or you could configure default rake which runs rspec and this rake task.
But 1st approach has side effect - your rake task will always populate database with products in this case, we don't want to do it, we just want to make sure that rake works.
2nd approach looks like more robust, but if you use default rake task for other things it's definitely not your choice. I prefer to test rakes by **rspec**.

# Solution

Check out **rspec test** below:

{% highlight ruby %}
require 'spec_helper'
require 'rake'

describe 'db:seeds' do
  before { MyApp::Application.load_tasks }

  it { expect { Rake::Task['products:load'].invoke }.not_to raise_exception }
end
{% endhighlight %}

**MyApp::Application** is a my application name, you can get it from `config/application.rb`:

{% highlight ruby %}
module MyApp
  class Application < Rails::Application
    ...
  end
end
{% endhighlight %}

I hope this code doesn't require deeper explanation and other lines of code are clear for you.
