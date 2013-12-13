---
layout: post
title: "Pass variables to javascript with gon"
description: "This post describes how to use gon gem with fun. Gon allows to pass ruby variables from rails server to javascript, but it can grow your controllers in huge monsters. So I offer interesting approach how to avoid it"
tags: [gem, rails, javascript]
---
{% include JB/setup %}

If you haven't noticed yet that there is a good solution passing *Rails* variables from controllers to javascript I will be happy to make you fun with [gon](https://github.com/gazay/gon). In this post I will show how to use it with controller's filters in a clean, dry and the best way. This approach will help you to avoid growing controllers in a big monsters.

## Using filters in contollers

If you don't know what is contoller filters and how use them, checkout [oficial documentation](http://guides.rubyonrails.org/action_controller_overview.html#filters). In our case we have to know that there are posibilities to apply filters for one action and this one form of using:

{% highlight ruby %}
class ApplicationController < ActionController::Base
  before_filter LoginFilter
end

class LoginFilter
  def self.filter(controller)
    unless controller.send(:logged_in?)
      controller.flash[:error] = "You must be logged in"
      controller.redirect_to controller.new_login_url
    end
  end
end
{% endhighlight %}

## Using Gon

Say, we have to pass *location* model as a json object from server side to client side (from rails controller to javascript). With *gon* we can reduce it to:

{% highlight ruby %}
class ProductsController < ApplicationController
  def show
    @product = Product.find(params[:id])
    gon.locations = @product.locations.as_json(:only => [:latitude, :longitude], :methods => [:address])
  end
end
{% endhighlight %}

Everything is ok, but if we have to pass a lot of variables to javascript we will get a fat controller. Also it's not easy to test controllers. So my solution will be to use `before_filter` here. Here is a example of fat controller's action:

{% highlight ruby %}
  def show
    gon.locations = @product.locations.as_json(:only => [:latitude, :longitude], :methods => [:address])
    gon.current_user = current_user.as_json(:only => [:email, :id])
    gon.redirect_path = users_path
    gon.global_variables = {
      :subdomain => @product.subdomain,
      :statistic => {
        :count_hints => @product.count_hints,
        :count_logins => current_user.count_logins
      }
    }
    gon.image_uploader = {
      :create_path => product_path(@product),
      :image_tempale => render_to_string(:partial => 'image')
    }
    # etc. and etc.
  end
{% endhighlight %}

This code looks too bad and I don't know how you fill when you see it, but my brain explodes.

## Useing Gon in a DRY way

So go down to business and make something with this peace of ugly code. Let's create `LocationGonFilter` class and move it to `app/filters` folder. You should create this folder if you don't have it.

{% highlight ruby %}
class LocationGonFilter
  def self.filter(controller)
    return unless controller.respond_to?(:gon)

    gon = controller.gon

    if resource = controller.send(:resource)
      if resource.respond_to?(:locations)
        gon.locations ||= []
        gon.locations |= resource.locations.as_json(:only => [:latitude, :longitude], :methods => [:address])
      end
    end
  end
end
{% endhighlight %}

After this we can refactor our controller:

{% highlight ruby %}
class ProductsController < ApplicationController
  before_filter LocationGonFilter, :only => [:show]

  def show
  end

  def resource
    @product ||= Product.find(params[:id])
  end
end
{% endhighlight %}

Test for this filter will be look like this:

{% highlight ruby %}
require 'spec_helper'

describe LocationGonFilter do
  let(:controller) { double(:some_controller) }
  let(:gon) { double(:gon) }
  let(:resource) { double(:resource) }
  let(:locations) { [create(:location), create(:location, :address2 => 'suite 2')] }
  let(:json_locations) { locations.as_json(:only => [:latitude, :longitude], :methods => [:address]) }

  context :without_gon do
    it { expect { LocationGonFilter.filter(controller) }.to_not raise_error }
  end

  context :with_gon do
    before { controller.stub(:gon).and_return(gon) }
    before { gon.stub(:locations).and_return([]) }
    before { controller.stub(:resource).and_return(resource) }

    context :filter do
      it { expect { LocationGonFilter.filter(controller) }.to_not change(gon, :locations) }

      it do
        resource.stub(:locations).and_return(locations)
        gon.stub(:locations=) do |args|
          gon.stub(:locations).and_return(args)
        end
        LocationGonFilter.filter(controller)
        gon.locations.should eq(json_locations)
      end
    end
  end
end
{% endhighlight %}

> I'm using FactoryGirl here to create locations

PS. I believe that every class should be responsible for only one thing (this is a [Single responsibility principle (SRP)](http://en.wikipedia.org/wiki/Single_responsibility_principle)). In my post I've explained how to achieve it for controller layer. Filters are separated layer and there we should filter parameters, controllers should inly listen requests, pass action to bottom layer (model) and then response on request, they should not contain complidated logic