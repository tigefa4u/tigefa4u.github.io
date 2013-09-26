---
layout: page
title: tigefa4u.github
tagline: love github repositories
---
{% include JB/setup %}
    
## Recent Posts

<div class="row">
<div class="col-md-8">
<div class="alert alert-info">
<ul class="posts">
  {% for post in site.posts %}
    <li><span class="label label-info"><i class="icon-calendar icon-white"></i> {{ post.date | date_to_string }}</span> <i class="icon-random"></i> <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	<hr>
  {% endfor %}
</ul>
</div>
</div>
<div class="col-md-4 well well-small">
<h3><i class="icon-folder-close"></i> All Pages</h3>
<ul>
{% assign pages_list = site.pages %}
{% include JB/pages_list %}
</ul>
<hr>
<h3><i class="icon-folder-open"></i> All Category</h3>
<ul class="tag_box inline">
  {% assign categories_list = site.categories %}
  {% include JB/categories_list %}
</ul>
<hr>
<h3><i class="icon-tags"></i> All Tags</h3>
<ul class="tag_box inline">
  {% assign tags_list = site.tags %}  
  {% include JB/tags_list %}
</ul>
</div>
</div> <!-- // row -->


