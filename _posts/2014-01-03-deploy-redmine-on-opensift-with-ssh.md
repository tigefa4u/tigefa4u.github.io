---
layout: post
title: "deploy redmine on openshift with ssh"
description: "easy deploy with rhc ssh redmine openshift cartridge"
category: [ruby, rails, redmine]
tags: [ruby, rhc, openshift]
---

Frist sign in on [openshift.redhat.com](https://openshift.redhat.com/app/login) or sign up new one its free with 1GB storage.

if existing member openshift know for start, using `rhc setup`

## Creating new app

~~~
rhc app create redmine ruby-1.9 mysql-5.1 cron-1.4 phpmyadmin-4
~~~

### Sign SSH

~~~
rhc ssh redmine
~~~

### Change directory website root index

~~~
cd ~/app-root/runtime/repo
~~~

### Get redmine stable releases. [Learn more](http://via.tigefa.org/1nLiH6m)

#### 2.6-stable version

~~~
wget --no-check-certificate http://www.redmine.org/releases/redmine-2.6.0.tar.gz; tar --strip-components=1 -xf *.tar.gz; rm *.tar.gz
~~~

#### 3-stable version

~~~
wget --no-check-certificate http://www.redmine.org/releases/redmine-3.0.1.tar.gz; tar --strip-components=1 -xf *.tar.gz; rm *.tar.gz
~~~

#### 2-stable version

~~~
wget --no-check-certificate http://www.redmine.org/releases/redmine-2.6.3.tar.gz; tar --strip-components=1 -xf *.tar.gz; rm *.tar.gz
~~~

#### Configure `config/database.yml`

~~~
wget --no-check-certificate http://git.io/Y_wiJw -O config/database.yml
~~~

### Bundle the `gem`

~~~
gem install bundler --no-ri --no-rdoc
~~~

~~~
bundle install --no-deployment
~~~

### Next installing redmine

#### Session store secret generation

~~~
rake generate_secret_token
~~~

#### Database schema objects creation

~~~
RAILS_ENV=production rake db:migrate
~~~

#### Database default data set. [Learn more](http://via.tigefa.org/1em10I3)

~~~
RAILS_ENV=production rake redmine:load_default_data
~~~

##### File system permissions [Learn more](http://via.tigefa.org/MUOIvc)

#### Logging into the application

Use default administrator account to log in:

~~~
login: admin
password: admin
~~~

You can go to Administration menu and choose Settings to modify most of the application settings.

##### [For learn more visit redmine wiki](http://via.tigefa.org/1igVc0Z)

### Adding alias `redmine.myproject.org` for example

~~~
rhc alias add redmine redmine.myproject.org
~~~

see [repo.tigefa.org](http://repo.tigefa.org)
