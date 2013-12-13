---
layout: post
title: "Don't generate trash with rails generators"
description: "When you generate controller in rails application many unexpected files are generated with it. I like to disable this behavior right after generating application. This post describes how to configure rails application to avoid trash generating"
tags: [rails]
---
{% include JB/setup %}

Let's assume that we have rails >= 3 application. When you generate controller a lot of trash is appeared in your application. I mean here these things: helpers, assets (css and js), view tests. In 99% cases these files are waste and never used, so it's reasonable to disable generating their. It's very easy.

## Configure your application

Go to *config/application.rb* and paste there these lines:

{% highlight ruby %}
config.generators do |g|
  g.assets = false
  g.helper = false
  g.view_specs = false
end
{% endhighlight %}

These magic lines of code will get rid of headache and you will forget about removing these trash manually forever!

Also I recommend to don't pass action names in rails controller generator because it inserts automatically routes which always are changed later.

Say we have runned command `rails g controller users new edit` it will generate the following *trash*.

Example of generated routes:

{% highlight ruby %}
get "users/new"
get "users/edit"
{% endhighlight %}

It also generates tests which are never remained in this look. For my opinion it's more useful to have pending tests than tests which do nothing.

Example of generated tests for controller:

{% highlight ruby %}
require 'spec_helper'

describe LessonsController do

  describe "GET 'new'" do
    it "returns http success" do
      get 'new'
      response.should be_success
    end
  end

  describe "GET 'edit'" do
    it "returns http success" do
      get 'edit'
      response.should be_success
    end
  end

end
{% endhighlight %}

Thank you for your attention!
