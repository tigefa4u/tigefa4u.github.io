---
layout: post
title: "Using Arrays and Objects in Backbone.js Models"
description: "Using arrays and objects in backbone models can cause some tricky behavior with how the model fires change events. Here's how to fix it."
category: [javascript, backbonejs]
tags: [javascript, backbonejs]
---
{% include JB/setup %}

If you've ever attempted to use arrays or objects on a Backbone.js model, you might have run into some strange behavior.

At first glance, everything seams perfectly normal. You can define a model with arrays/objects as properties no problem.

    var Dog = Backbone.Model.extend({
        defaults: {
            legs: 4,
            likes: ["eating", "belly rubbs", "barking at people"]
        }
    });

    var skip = new Dog({ name: "Skip" });
    skip.get('likes');
    // -> ["eating", "belly rubbs", "barking at people"]

But as soon as you try to change those properties you'll see that your model doesn't fire change events consistently.

Setting the property to a new array __does__ fire the change event.

    skip.set('likes', ["playing fetch"]);
    // -> 'changed!'

    skip.get('likes');
    // -> ["playing fetch"]

Using `.get()` and changing the array __does not__ fire the change event, but __does__ change the model.

    skip.get('likes').push("eating shoes");
    // ->

    skip.get('likes');
    // -> ["playing fetch", "eating shoes"]

_(now it gets really weird)_

Using `.get()`, changing the array, and re-setting it also __does not__ fire the change event, but __does__ change the model.

    var newlikes = skip.get('likes');
    newlikes.push("walks");
    // our model is still the same

    skip.set('likes', newlikes);
    // ->

    skip.get('likes');
    // -> ["playing fetch", "eating shoes", "walks"]

So what to do now?

### Always use _.clone()

[Underscore](http://underscorejs.org/ "underscorejs.org") (a dependency of backbone), includes a handy `clone()` function that can fix this problem. If you clone the array first, it will behave just like any other property.

    var newlikes2 = _.clone(skip.get('likes'));
    newlikes2.pop();

    skip.set('likes', newlikes2);
    // -> 'changed!'

    skip.get('likes');
    // -> ["playing fetch", "eating shoes"]

This problem can be especially tricky to catch, because you most often won't notice it until your views are only rendering part of the time.

If you want to read more on this problem, there's a good in-depth [answer on stackoverflow](http://stackoverflow.com/questions/11661380/does-backbone-models-this-get-copy-an-entire-array-or-point-to-the-same-array "stackoverflow.com/questions/11661380") on the subject.
