---
layout: post
title: "Cascading selects with AJAX in Rails"
description: "This post describes technique which allows to populate select which relates to chosen value by other select. For example there 2 selects on the page: country and state, when I choose country the state's select should be populated with states of chosen country"
tags: [coffeescript, rails, ajax]
---
{% include JB/setup %}

I bet you had an issue with dynamic populating of values for *select* which depends on a chosen value of other *select*. For example when I choose the country,  *select* of the state  should be populated by the states of the chosen country. There are many solutions of this problem. You could find them with Google but none of them  is suitable for me because of bugs or using the approach with caching. I have had this issue again and again and my googling was not successful. Eventually some time ago I invented jQuery library and approach with solves this problem and completely  suits me. This approach assumes that you don't use javascript frameworks like *Ember.js* or *Angular.js*.  In other case, my solution may be needless  in your application.

## Problem

This image will clarify the problem without any words:

![Cascading select](/images/select-car.png)

## Solution

The first thing which I should pay attention to in my solution is a *jQuery* library:

> app/assets/javascripts/jquery-dynamic-selectable.coffee

{% highlight javascript %}
$.fn.extend
  dynamicSelectable: ->
    $(@).each (i, el) ->
      new DynamicSelectable($(el))

class DynamicSelectable
  constructor: ($select) ->
    @init($select)

  init: ($select) ->
    @urlTemplate = $select.data('dynamicSelectableUrl')
    @$targetSelect = $($select.data('dynamicSelectableTarget'))
    $select.on 'change', =>
      @clearTarget()
      url = @constructUrl($select.val())
      if url
        $.getJSON url, (data) =>
          $.each data, (index, el) =>
            @$targetSelect.append "<option value='#{el.id}'>#{el.name}</option>"
            # reinitialize target select
          @reinitializeTarget()
      else
        @reinitializeTarget()

  reinitializeTarget: ->
    @$targetSelect.trigger("change")

  clearTarget: ->
    @$targetSelect.html('<option></option>')

  constructUrl: (id) ->
    if id && id != ''
      @urlTemplate.replace(/:.+_id/, id)
{% endhighlight %}

This peace of code extends jQuery with a *dynamicSelectable* function which you can call on *select* which should be listened to change and populate the dependent *select*. The listened *select* should has data attributes: *selectable-url* and *selectable-target*. Their names explain what they are for:

*selectable-url* - is an url pattern with the model id. For example: `/dynamic_select/:country_id/states`. In this case the pattern should be populated with the chosen country id (assuming that we add listener to country's select) and request will go to this url to get JSON data for populating related *select*.

*selectable-target* - is a css selector of *select* which should be populated with given JSON data from the server.


I call *dynamicSelectable* function for every *select* on the page which has both data attributes *selectable-url* and *selectable-target* simultaneously:

> app/assets/javascripts/application.coffee

{% highlight javascript %}
...
$ ->
  $('select[data-dynamic-selectable-url][data-dynamic-selectable-target]').dynamicSelectable()
{% endhighlight %}

To make our application workable we should have a controller which will be responsible for the route `/dynamic_select/:country_id/states`. Firstly have a look at how I generate route:

> config/routes.rb

{% highlight ruby %}
...
namespace :dynamic_select do
  get ':country_id/states', to: 'states#index', as: 'states'
end
...
{% endhighlight %}

And this is how my controller looks:

> app/controllers/dynamic_select/states_controller.rb

{% highlight ruby %}
module DynamicSelect
  class StatesController < ApplicationController
    respond_to :json

    def index
      @states = State.where(:country_id => params[:country_id])
      respond_with(@states)
    end
  end
end
{% endhighlight %}

And this is a template of *index action*:

> app/views/dynamic_select/states.index.jbuilder

{% highlight ruby %}
json.array!(@states) do |state|
  json.extract! state, :name, :id
end
{% endhighlight %}

Returned JSON data from server should not include root elements:

> config/intializers/wrap_parameters.rb

{% highlight ruby %}
...
ActiveSupport.on_load(:active_record) do
 self.include_root_in_json = false
end
{% endhighlight %}

And the last thing which I should focus on is a form:

{% highlight ruby %}
<div class="field">
  <%= f.label :country_id %><br>
  <%= f.collection_select :country_id, Country.all, :id, :name,
      {include_blank: true},
      { data: {
          dynamic_selectable_url: dynamic_select_states_path(':country_id'),
          dynamic_selectable_target: '#event_state_id'
        }
      } %>
</div>
<div class="field">
  <%= f.label :state_id %><br>
  <%= f.collection_select :state_id, @event.country.try(:states) || [], :id, :name, :include_blank => true  %>
</div>
{% endhighlight %}


Check out the [code on github](https://github.com/railsguides/dynamic-selectable-demo) and the live [demo here](http://afternoon-lake-2182.herokuapp.com/events/new).

If you have any proposals concerning this solution or if you have spotted any typo, bug, inconsistency or lacks feel free to contact with me.
