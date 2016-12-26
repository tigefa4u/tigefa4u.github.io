---
layout: post
title: "flat file blog PHP and Markdown"
description: "flat-file blog, written in PHP and Markdown."
categories: php
tags: [github, markdown, php]
---

# stevenschobert.com

My flat-file blog, written in PHP and Markdown.

## Adding Posts

Create a `.md` file with the following bit JSON at the top, and save it in the `posts` directory:

{% highlight yaml %}
{
  "title": "Post Title",
  "date": "Aug 20, 2012",
  "tags": ["github"]
}
--
{% endhighlight %}

Simple and fast. One of the main perks of having a flat-file blog.

## Configuration

Near the top of the `index.php` file, there's some global settings that can be adjusted:

{% highlight php %}
$blog = new Slim(array(
  'view'        => new TwigView(),
  'posts.path'  => './posts',
  'md'          => new dflydev\markdown\MarkdownParser(),
  'pagination'  => 5
));
{% endhighlight %}

- `posts.path`: The relative path to the directory that holds the Markdown posts
- `pagination`: The number of posts that are show per-page

__Note:__ the `view` and `md` are required and not customizable.

## Theming

All the templates are built with [Twig](http://twig.sensiolabs.org/ "twig.sensiolabs.org") and are in the `templates` directory.

- `main.html`: The core html template. All of the other templates extend this one. Contains all js/css links, headers & footers, etc.
- `index.html`: The home page template. Right now shows your blog index.
- `post.html`: The post view page, shows a single post.
- `404.html`: Custom 404 template.
- `about.html`: An about me page
- `tagged.html`: The tag search template.
- `pagination.html`: The pagination template (partial) that shows on the bottom of the blog index.

Changing out styles is as easy as changing the `<link>` tag in the `main.html` template:

{% highlight html %}
<link rel="stylesheet" href="/css/main.css" />
{% endhighlight %}

More documentation on Twig is [available here](http://twig.sensiolabs.org/documentation "twig.sensiolabs.org/documentation").

## Advanced Customization

The whole blog engine is built on top of the [Slim Framework](http://www.slimframework.com/ "slimframework.com"). 
Stable documentation is [available here](http://www.slimframework.com/documentation/stable "slimframework.com/documentation/stable").
