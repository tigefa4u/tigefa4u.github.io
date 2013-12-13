---
layout: post
title: "Rails 3 does not render partial for specific format - resolving issue"
description: "There is a problem in Rails 3: if you would like to render for example html format for partial in ajax request you won't manage it in Rails 3. In this post I will describe how to avoid this problem"
tags: [rails3, render]
---
{% include JB/setup %}

## Problem

For example you make ajax request with json format to the server. And assume we have to render some partial in the controller or view and return it in json object. In the view you may have code like this:

+ *Rails3 view*
{% highlight ruby %}
<%= {:form => render('form')}.to_json %>
{% endhighlight %}

In the Rails 2 you could pass format as option in reder function and it fixed problem:

+ *Rails2 view*
{% highlight ruby %}
<%= {:form => render(:partial => 'form', :format => :html)}.to_json %>
{% endhighlight %}

But in Rails 2 this is not working. But there is a fix this issue and it merged to the master. So, in rails 4 it indeed will work and signature for method will be like this:

+ *Rails4 view*
{% highlight ruby %}
<%= {:form => render(:partial => 'form', :formats => [:html])}.to_json %>
{% endhighlight %}

To enable this feature in Rails 3 you can make monkey patch: just create new file *config/initializers/renderer.rb* in your application and paste there this code:

+ *Mokeypatch for Rails3*
{% highlight ruby %}
class ActionView::PartialRenderer
  private
  def setup_with_formats(context, options, block)
    formats = Array(options[:formats])
    @lookup_context.formats = formats | @lookup_context.formats
    setup_without_formats(context, options, block)
  end

  alias_method_chain :setup, :formats
end
{% endhighlight %}