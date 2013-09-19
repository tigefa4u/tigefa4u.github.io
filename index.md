---
layout: page
title: tigefa4u.github
tagline: love github repositories
---
{% include JB/setup %}
    
## Recent Posts

<div class="well">
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
</div>

## Fork me on github

~~~ bash
~ git clone https://github.com/tigefa4u/tigefa4u.github.io.git
~ cd tigefa4u.github.io
~ /tigefa4u.github.io $ jekyll serve
# => Now browse to http://localhost:4000
~~~


