---
layout: post
title: "Jekyll - the best blog engine"
description: "This post describes how to use github pages (gh-pages) as hosting to have a simple blog based on jekyll engine. You don't have to pay for hosting at all for it"
tags: [jekyll, git, hosting, blog]
---
{% include JB/setup %}

Have you ever wanted to have a nice, simple to use free blog engine for developer? If have this post is especially for you.

## Blog engine

I think that *Jekyll* is the best blog engine for programmer today. It has everything what you want as developer to write your thoughts down:

* simple template system
* *markdown*, *html* or *textile* templates with *liquid* includes and *possibilities* to add inline html
* code highlighting
* ability to extend system with plugins
* ready to use html templates ([twitter, tom, the-program, the-minimum and mark-reid](http://themes.jekyllbootstrap.com/preview/twitter/) are available for now)
* permalink customization
* SEO features (meta tags, sitemap.xml, atom.xml are available out of box)
* tags supporting
* lightweight and fast
* without database
* without hosting headaches
* comments system out of box
* google analytics out of box

In the same time this blog engine is very simple and it generates static pages, so it works rather quickly. There is a just engine without any template and it available on [GitHub](https://github.com/mojombo/jekyll) but you can use [ready templates](http://jekyllbootstrap.com/). I prefer second variant to install it.

As a hosting jekyll get on well with [github-pages](http://pages.github.com/). It is the simplest way to push your blog to the internet.

If you have blog on another engine (Tumblr, Posterous, Blogger/Blogspot, Mephisto, TextPattern, Typo 4+, Movable Type, Drupal or WordPress) you are able to migrate to this one very simple. How to do it you can find [here](https://github.com/mojombo/jekyll/wiki/Blog-Migrations).

## Installation

> I will describe here deployment process only to github pages. If you would like to deploy code to your server you should follow [these instructions](https://github.com/mojombo/jekyll/wiki/Deployment).

Firstly you should have account on the [GitHub](http://github.com). If you don't have one, sign up there. Then [Create repository](https://github.com/repositories/new) with name *USERNAME.github.com*.

    $ git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.com
    $ cd USERNAME.github.com
    $ git remote set-url origin git@github.com:USERNAME/USERNAME.github.com.git
    $ git push origin master

After this actions you will have ready to use blog template. To write posts locally you should [install](https://github.com/mojombo/jekyll/wiki/Install) *jekyll* gem.

Available actions with blog are:

    rake page           # Create a new page.
    rake post           # Begin a new post in ./_posts
    rake preview        # Launch preview environment
    rake theme:install  # Install theme
    rake theme:package  # Package theme
    rake theme:switch   # Switch between Jekyll-bootstrap themes.

By the way this blog is also based on *jekyll-bootstrap*. Really awesome blog engine, check it out!