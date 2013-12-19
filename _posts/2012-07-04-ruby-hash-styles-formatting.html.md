---
layout: post
title: "Ruby hash styles formatting"
description: "Advice how to improve code formatting of hash styles for Ruby/Ruby On Rails"
tags: [ruby, rails, formatting]
---
{% include JB/setup %}

Have you ever felt annoying in formatting of hash keys/values in Ruby code? So have I. And I'm going to describe
how to improve it in this post.

## Variants of using

Asume we have to write some method *build_location* which receives hash object with a lot of default parameters. So
in this case we have a few variants how to format this peace of code:

*Inline* (1)
{%  highlight ruby %}
def build_location(params = {:first_name => 'FirstName', :last_name => 'LastName', :address => 'DefaultValue', :phone => 'PhoneNumber', ...})
...
end
{% endhighlight %}

*Pure blocks* (2)
{% highlight ruby %}
def build_location(params = {:first_name => 'FirstName',
                             :last_name  => 'LastName',
                             :address    => 'DefaultValue',
                             :phone      => 'PhoneNumber', ...})
...
end
{% endhighlight %}

*Using begin-end Pairs (Braces) to Designate Block Boundaries* (3)
{% highlight ruby %}
def build_location(params = {
    :first_name => 'FirstName',
    :last_name  => 'LastName',
    :address    => 'DefaultValue',
    :phone      => 'PhoneNumber', ...
})
...
end
{% endhighlight %}

## Selection

Block #1 seems disgusting, because we have infinite line of parameters. It is too difficult to find something in it and add new parameter.
Block #2 looks rather pretty, but if you want to change parameter name of add one you will have to format them again. So this code is too
difficult to support also. So my choose is **#3**.

## The best one

In block **#3** we have easy supported code, if we change list of parameters or change name we won't have to change anything with hash parameters.
Code like this I will chose not only for styling method parameters but for any place in code where I have hash with list of many parameters.
To confirm this assertion let's try to change name of parameter and add new:

{% highlight ruby %}
def build_location(user, this_is_default_params = {
    :first_name => 'FirstName',
    :last_name  => 'LastName',
    :address    => 'DefaultValue',
    :phone      => 'PhoneNumber', ...
})
...
end
{% endhighlight %}

As you can see I've changed only that what I wanted without any regression issues for formatting my code.

# Additional resources

A lot of code examples for this theme you can find in book [Code Complete, second edition](http://www.amazon.com/Code-Complete-ebook/dp/B004OR1XGK/ref=sr_1_7?ie=UTF8&qid=1341409481&sr=8-7&keywords=code+complete+2) by Steve McConnel.
This is a huge book, but it is very interesting, important, and contains a lot of advices for coding. Also it includes in list of books [which must read every programmer](http://stackoverflow.com/questions/1711/what-is-the-single-most-influential-book-every-programmer-should-read). Thank you, Steve, for your hard work!
<dl class='figure'>
	<img src='/images/code_complete.jpg' alt='Code Complete, second edition. By Steve McConell'></img>
</dl>