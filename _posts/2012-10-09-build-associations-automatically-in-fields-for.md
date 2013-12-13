---
layout: post
title: "Build associations automatically in fields_for helper"
description: "Check out my gem. It is extension for fields_for helper which allows to avoid boring code foe creating associated object belongs_to and has_one association."
tags: [rails, gem]
---
{% include JB/setup %}

Assume you have code in your project like this:

{% highlight ruby %}
form_for :company do |f|
  f.fields_for(:user, f.object.user || f.object.build_user) do |ff|
    ff.text_field :name
{% endhighlight %}

With [get_or_build](https://github.com/ka8725/get_or_build) gem you are able to translate this code to code like this:

{% highlight ruby %}
form_for :company do |f|
  f.fields_for(:user, :build_association => true) do |ff|
    ff.text_field :name
{% endhighlight %}

Hope you will enjoy this gem! Thank you for your attention!