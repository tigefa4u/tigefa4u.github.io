---
layout: post
title: "Clean up your controllers with inherited resources"
description: "This posts describes how to use one of the best rails tools - inherited_resources gem. You will find out how to use it in rails development and how it can help you to spend less time have less bugs in your code. I hope this technique will be useful for all rails developers"
tags: [rails, gem, rest, refactoring]
---
{% include JB/setup %}

If you haven't noticed yet that main rule in rails development says do not complicate logic in controller I recommend you to read these articles:

* [Skinny controller, fat model](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model)
* [Rails Model View Controller + Presenter?](http://blog.jayfields.com/2006/09/rails-model-view-controller-presenter.html)

This post assumes that you've already known this truth and it's not necessary to clarify it for you. Also I assume that you know what is [REST](https://peepcode.com/products/rest-for-rails-2) and those idea that you should follow [RESTful](https://peepcode.com/products/rest-for-rails-2) rules. I will show you how to avoid writting boring repetitive code in controllers.

## Boring code

Imagine you have controller:

{% highlight ruby %}
class ChannelsController < ApplicationController
  def index
    @channels = current_user.channels
    respond_with(@channels)
  end

  def new
    @channel = current_user.channels.build
    respond_with(@channel)
  end

  def create
    @channel = current_user.channels.build(params[:channel])
    @channel.save
    respond_with(@channel)
  end

  def show
    @channel = current_user.channels.find(params[:id])
    respond_with(@channel)
  end

  def edit
    @channel = current_user.channels.find(params[:id])
    respond_with(@channel)
  end

  def update
    @channel = current_user.channels.find(params[:id])
    @channel.update_attributes(params[:channel])
    respond_with(@channel)
  end

  private
  def current_user
    @current_user ||= User.find(params[:user_id])
  end
end
{% endhighlight %}

This code is looking pretty nice. But it contains a lot of repetitive code such as: `current_user.channels.find(params[:id])`, `respond_with` and so on. Of cource you can write before filters to avoid this collision like this:

{% highlight ruby %}
class ChannelsController < ApplicationController
  before_filter :find_channel, :only => [:edit, :show, :update]

  def index
    @channels = current_user.channels
    respond_with(@channels)
  end

  def new
    @channel = current_user.channels.build
    respond_with(@channel)
  end

  def create
    @channel = current_user.channels.build(params[:channel])
    @channel.save
    respond_with(@channel)
  end

  def show
    respond_with(@channel)
  end

  def edit
    respond_with(@channel)
  end

  def update
    @channel.update_attributes(params[:channel])
    respond_with(@channel)
  end

  private
  def find_channel
    @channel = current_user.channels.find(params[:id])
  end

  def current_user
    @current_user ||= User.find(params[:user_id])
  end
end
{% endhighlight %}

Looks beter, yes? But it's possible to write this functionality in 3 (!!!) lines at all. Check it out:

{% highlight ruby %}
class ChannelsController < InheritedResources::Base
  belong_to :user
end
{% endhighlight %}

So, there is no any boring code, it's really clean controller and you can fill confident that it doesn't contain any bug, your views work as before and you don't have to change there anything.
If you are interested in it just insert this line in your *Gemfile*:

    gem 'inherited_resources'

and that's it. Pay attention that you have to inherit your controllers not from `ApplicationController` but from `InheritedResources::Base`.

## Complicated logic

May be you've paid attention that `ChannelsController` had private method:

    def current_user
      @current_user ||= User.find(params[:user_id])
    end

which gets current_user for each request, also this controller requires *:user_id* param. This controller listens to following routes:

           user_channels GET    /users/:user_id/channels(.:format)              channels#index
                         POST   /users/:user_id/channels(.:format)              channels#create
        new_user_channel GET    /users/:user_id/channels/new(.:format)          channels#new
       edit_user_channel GET    /users/:user_id/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /users/:user_id/channels/:id(.:format)          channels#show
                         PUT    /users/:user_id/channels/:id(.:format)          channels#update
                         DELETE /users/:user_id/channels/:id(.:format)          channels#destroy

But what if you don't want to pass :user_id to every call and all channels should be in current_user scope? Here `current_user` is a helper method in `ApplicationController` which holds signed in user. It's not problem for `inherited_resources` gem too:

{% highlight ruby %}
class ChannelsController < InheritedResources::Base

  protected
  def begin_of_association_chain
    @begin_of_association_chain ||= current_user
  end
end
{% endhighlight %}

It will be enough to get working contoller for our demands. Now you can change your routes:

           user_channels GET    /user/channels(.:format)              channels#index
                         POST   /user/channels(.:format)              channels#create
        new_user_channel GET    /user/channels/new(.:format)          channels#new
       edit_user_channel GET    /user/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /user/channels/:id(.:format)          channels#show
                         PUT    /user/channels/:id(.:format)          channels#update
                         DELETE /user/channels/:id(.:format)          channels#destroy

Let's complicate logic and rework our controller to listen to both variants of routes:

           user_channels GET    /user/channels(.:format)              channels#index
                         POST   /user/channels(.:format)              channels#create
        new_user_channel GET    /user/channels/new(.:format)          channels#new
       edit_user_channel GET    /user/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /user/channels/:id(.:format)          channels#show
                         PUT    /user/channels/:id(.:format)          channels#update
                         DELETE /user/channels/:id(.:format)          channels#destroy
           user_channels GET    /users/:user_id/channels(.:format)              channels#index
                         POST   /users/:user_id/channels(.:format)              channels#create
        new_user_channel GET    /users/:user_id/channels/new(.:format)          channels#new
       edit_user_channel GET    /users/:user_id/channels/:id/edit(.:format)     channels#edit
            user_channel GET    /users/:user_id/channels/:id(.:format)          channels#show
                         PUT    /users/:user_id/channels/:id(.:format)          channels#update
                         DELETE /users/:user_id/channels/:id(.:format)          channels#destroy

How to change our `ChannelController`? Very simple:

{% highlight ruby %}
class ChannelsController < InheritedResources::Base

  protected
  def begin_of_association_chain
    @begin_of_association_chain ||= (User.find_by_id(params[:user_id]) || current_user) || raise(ActiveRecord::RecordNotFound)
  end
end
{% endhighlight %}

This way we have universal RESTful controller and we fit it in 6 lines of code instead of 100 or may be 200.

## Resources

Check out [InheritedResources gem](https://github.com/josevalim/inherited_resources) and read its README. I promise you will find there a lot of interesting information which I've omited in my post. Also README is not contained information for all possibilities, so I would recommend you to read sources.

I hope you don't blame me for your spent time. Thank you for your reading!

PS. *InheritedResources* is  compatible with [cacan](https://github.com/ryanb/cancan/wiki/Inherited-Resources). You have to add one line code `load_and_authorize_resource` and your restrictions will work exactly how you want.