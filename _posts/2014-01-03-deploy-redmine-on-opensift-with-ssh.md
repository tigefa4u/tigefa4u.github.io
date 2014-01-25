---
layout: post
title: "deploy redmine on openshift with ssh"
description: "easy deploy with rhc ssh redmine openshift cartridge"
category: [ruby, rails, redmine]
tags: [ruby, rhc, openshift]
---

frist sign in on [openshift.redhat.com](https://openshift.redhat.com) or sign up new one its free with 1GB storeage.

if existing member openshift know for start, using `rhc setup`

## Creating new app

~~~
rhc app create redmine ruby-1.9 mysql-5 cron-1.4 phpmyadmin-4
~~~

### Sign SSH

~~~
rhc ssh redmine
~~~

### Change directory website root index

~~~
cd ~/app-root/runtime/repo
~~~

### Get redmine stable releases from [redmine/wiki/Download](http://www.redmine.org/projects/redmine/wiki/Download)

#### 2.4-stable version

~~~
wget http://www.redmine.org/releases/redmine-2.4.2.tar.gz && tar --strip-components=1 -zxvf *.tar.gz && rm *.tar.gz
~~~

#### 2.3-stable version

~~~
wget http://www.redmine.org/releases/redmine-2.3.4.tar.gz && tar --strip-components=1 -zxvf *.tar.gz && rm *.tar.gz
~~~

#### Configure `config/database.yml`

~~~
wget --no-check-certificate https://gist.github.com/tigefa4u/8215989/raw/4055a0ad6d7357e637de96232c70dc72047b722e/database.yml && mv database.yml config/
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

#### Database default data set [more](http://www.redmine.org/projects/redmine/wiki/RedmineInstall#Step-7-Database-default-data-set)

~~~
RAILS_ENV=production rake redmine:load_default_data
~~~

##### [File system permissions](http://www.redmine.org/projects/redmine/wiki/RedmineInstall#Step-8-File-system-permissions)

#### Logging into the application

Use default administrator account to log in:

~~~
login: admin
password: admin
~~~

You can go to Administration menu and choose Settings to modify most of the application settings.

##### [for more visit redmine wiki](http://www.redmine.org/projects/redmine/wiki/RedmineInstall#Configuration)

### Adding alias `redmine.myproject.org` for example

~~~
rhc alias add redmine redmine.myproject.org
~~~

see [repo.tigefa.org](http://repo.tigefa.org)

