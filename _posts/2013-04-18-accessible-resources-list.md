---
layout: post
title: "Accessible resources list - DRY solution for controllers"
description: "In this post I describe how to achieve DRY solution for controller's actions which return the list of scoped objects. In the another words I show here how to avoid repetitive changes in controllers actions like this: Model.where :active => true"
tags: [rails, cancan, refactoring, gem]
---

Imagine that we have *Trademarks* controller with *index* action. But in this action we shouldn't get all trademarks. Rather than all objects we have to get all *active trademarks* which are *accessible by current user only*. This is a challenge which I'm going to solve here.

## The sledge-hammer

The simplest solution will be something like this:

{% highlight ruby %}
class TrademarksController < ApplicationController
  def index
    @trademarks = Trademark.where :active => true
  end
end
{% endhighlight %}

One day we have to change our conditions for select trademarks:

{% highlight ruby %}
class TrademarksController < ApplicationController
  def index
    @trademarks = Trademark.where :active => true, :owner_id => current_user.id
  end
end
{% endhighlight %}

Of course we can define here scope on the *Trademark* model but this will not save us from changes in the controller - we still has chance to edit index action in the feature. For example, we would have to combine two scopes there.

## DRY solution

There is a better solution which can help us to avoid these repetitive task. But this solution is achieved by installing the *cancan* gem. I hope you don't hate this gem and able to add it to the project.

So, the first step for this solution as you have already guessed will be installing *cancan* - add it to the *Gemfile* and install it running *bundle install* command in your terminal. Initialize it with *rails g cancan:ability*.

Open */app/models/ability.rb* file and define there abilities. Let's do it:


{% highlight ruby %}
class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    can :read, Trademark, :active => true, :owner_id => user.id
  end
end
{% endhighlight %}

Currently we are on the last step. We have to refactor controller now - use *accessible_by* method which is provided by *cancan*:

{% highlight ruby %}
class TrademarksController < ApplicationController
  def index
    @trademarks = Trademark.accessible_by(current_ability)
  end
end
{% endhighlight %}

Implementation of the *accessible_by* method is too simple:

{% highlight ruby %}
def accessible_by(ability, action = :index)
  ability.model_adapter(self, action).database_records
end
{% endhighlight %}

It just fetches records from the database according specified scopes in the abilities. Pay attention that you are able to pass any action here, not only index action as I did.

Here we are. The code in the controller's action won't be changed so often as it was before. I think, that we reduced possibility to changes for this action as far as possible.

There is an one constraint here - you are not able to use abilities which are defined with blocks (please, read this [doc](https://github.
com/ryanb/cancan/wiki/Defining-Abilities-with-Blocks) how to define abilities).

Fetching Records technique documentation is described [here](https://github.com/ryanb/cancan/wiki/Fetching-Records).
