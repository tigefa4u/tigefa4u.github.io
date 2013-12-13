---
layout: post
title: "Locomotive CMS - the best content management system"
description: "Hello! Today I and this post will show you the best content management system in the world for now - it is Locomotive CMS! Locomotive CMS is open source content management system and it means that it is absolutely free CMS! It contains content management framework and manager for models and entities - it's awesome!"
tags: [rails, cms]
---
{% include JB/setup %}

## Brief description

[Locomotive CMS](http://www.locomotivecms.com/) is open source content management system which based on **Ruby On Rails** framework.

![Locomotive cms - open source content management system](/images/loco.jpg)

It uses **MongoDB** for backend and compatible for deployement with all **rails** web-servers such as: unicorn, passenger or puma and etc. It provides configs for connection with sendgrid and s3, and also there is a [gem](https://github.com/locomotivecms/locomotive-heroku) wich allows [deploy](http://doc.locomotivecms.com/installation/heroku) loco to [Heroku](http://heroku.com), so this means that you are able to have absolutely free web site in the internet (certainly not without limitations as I have alreay said [here](http://railsguides.net/2012/03/19/deploy-ruby-on-rails-3-application-to-free-hosting))

## Features

* Provides multisite content management system

This means that you are able to create many sites within one admin space, give them domains and manage content from one place - loco's admin.

* Internationalized admin interface

English, Brazilian Portuguese, Norwegian, Estonian, German, Italian, Spanish, French, Dutch and Russian languages are available for now.

* Ability to define models with custom fields and associations between them

It's the main benefit of the system for my mind. You are able to define model this fields types: text fields for text area, text field for text inputs (for text less than 255 letters), select, date, checkbox, and file (!!!) (based on carriarwave gem). There are available associations between models: belongs_to, has many, many to many. You define model in the UI interface and it doesn't require developer at all.

![Defining models in locomotive cms admin](/images/loco_fields.jpg)

* Ability to create entities for your models

After defining model you can add entities for this models and also associate another entities according your defined associated models.

* Simple and powerful visual editor for site content

It uses nice wysiwyg [TinyMCE editor](http://www.tinymce.com/)

![wysiwyg editor locomotive cms](/images/loco_editor.jpg)

* Inline iditiing

You are able to edit content for site even on the frontend. You don't have to go to admin to change content for the site - just click on inline editor link and that's it!

* Supports cloud systems

As I have already said it supports out of box cloud systems like Amazon s3, Heroku, MongoHQ, SendGrid.

* Liquid templates

With liquid template you are able to show dynamic content with your defined model entities. Liquid is quite simple language and it doesn't require a lot of programming knowledge. I'm sure every html coder can use it!

* SEO tags out of the box

Just paste liquid tag in the layout or specific page and it will generate SEO tags automatically!

* Layout system

Just define your main layout once ond inherit another pages from this one and replace needed blocks. Very simple and powerful!

* Google analitic out of the box
* Pagination out of the box
* Content localization
* Navigation out of the box

There is a liquid template which generate main menus for site automatically.

* API

Api provides communicate admin with frontend and this allow you to create your forms in the frontend - great!


## Conclusion

I'm using this content management system for [one of my projects](http://new.private-tutor.ru/) and it is awesome. I've fallen in love Locomotive CMS - it's exactly that what I've been looking for ages. No doubt it is the best content management system for today. To get started with it after installation I would recomend to read [this post](http://www.tommyblue.it/2011/02/28/how-to-build-a-website-with-locomotive-cms-from-scratch), it describes steps for beginners. Unfortunetely there are not so many information (documentation) as I would like and sometimes I'm reading locomotive cms sources to understand how it works, but you have me ;) I will be glad to see your questions and I will answer for them with pleasure. Thanks for reading!
