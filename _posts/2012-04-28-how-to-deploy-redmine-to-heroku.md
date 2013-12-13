---
layout: post
title: "How to deploy Redmine to Heroku"
description: "This post describes how to deploy free bugtracker Redmine 2 to free Hosting - Heroku"
tags: [heroku, redmine, rails, hosting]
---
{% include JB/setup %}

This post describes how to deploy absolutely free bugtracker - **Redmine** to free hosting **Heroku**. That's way you will have free bugtracker in the internet. There are many post in the internet that describe how to deploy old version of **Redmine** to **Heroku**, but I couldn't find any information how to deploy new version of **Redmine**: **Redmine 2**. So if you have the same problem - you are welcome

## Changes for Heroku

> NOTE: This manual is actual only for Redmine 2.2.2 version. There are a lot of changes in next release which will be I think 2.2.3. I would write manual for Redmine 2.2.3 if you donated me:
{% include JB/donate %}

So let's go! Firstly we need to clone sources from **github**:

    wget https://github.com/edavis10/redmine/archive/2.2.2.tar.gz
    tar -zxvf 2.2.2.tar.gz
    cd redmine-2.2.2
    git init .

Open *.gitignore* file in your favourite editor and remove lines:

	Gemfile.lock
	Gemfile.local
	public/plugin_assets
	config/initializers/session_store.rb
	config/initializers/secret_token.rb
	config/configuration.yml
	config/email.yml

Install gems:

	bundle install

Execute rake task to generate session token:

	rake generate_secret_token

Create application on the heroku:

	heroku create NAME_FOR_YOUR_APP

Make commit and push changes to heroku origin:

	git add -A
	git commit -m "prepare for heroku"
	git push heroku

Make sure that all gems was installed on the heroku server and after this run migrations there with loading default data for properly working Redmine:

	heroku run rake db:migrate
	heroku run rake redmine:load_default_data

That's all, you can test it now in the browser:

	heroku open

Default user for Redmine is **admin** and password is **admin** too.

## Email confirmations

Firstly add add-on on the heroku for your application:

	heroku addons:add sendgrid:starter

There is a limitation for free version of this add-on: *200 emails per day*. So if you have more emails for one day you have to change plan of add-on to more appropriate. For more information, please, read [add-on desription](https://addons.heroku.com/sendgrid).

Create *config/configuration.yml* file and add there the following changes and change user_name and password to yours:

{% highlight ruby %}
production:
  delivery_method: :smtp
  smtp_settings:
    address: "smtp.sendgrid.net"
    port: 25
    authentication: :plain
    domain: "heroku.com"
    user_name: "SENDGRID_USERNAME"
    password: "SENDGRID_PASSWORD"
{% endhighlight %}

Push changes to the heroku:

	git add -A
	git commit -m "email configuration"
	gut push heroku

## Save uploaded files to Amazon S3

If you are going to add attachment to tasks or just upload files to redmine you can setup **redmine_s3** plugin: [http://github.com/ka8725/redmine_s3.git](http://github.com/ka8725/redmine_s3.git). Please follow link to read instrunctions how to install it. This is my fork of original gem: **git://github.com/tigrish/redmine_s3.git**

> Since **Redmine 2** has released there are many changes there and gem **git://github.com/tigrish/redmine_s3.git** is not working with it now. That's why I forked this gem and have changed it.

> Don't forget to remove directory **plugins/redmine_s3/.git** before make commit. This plugin won't be install on the **Heroku** otherwise and you won't be able to save files to **s3**.

Create configuration file for *redmine_s3* gem:

    cp plugins/redmine_s3/config/s3.yml.example config/s3.yml

Edit *config/s3.yml* with your favourite editor: paste there your credentials (security keys) for AWS S3 and bucket name. Bucket should be already created on the S3.

Push changes to the heroku:

	git add -A
	git commit -m "s3 configuration"
	gut push heroku

To start server on the heroku you should also remove or comment out this code in *config/environment.rb*:

{% highlight ruby %}
# Make sure there's no plugin in vendor/plugin before starting
vendor_plugins_dir = File.join(Rails.root, "vendor", "plugins")
if Dir.glob(File.join(vendor_plugins_dir, "*")).any?
  $stderr.puts "Plugins in vendor/plugins (#{vendor_plugins_dir}) are no longer allowed. " +
    "Please, put your Redmine plugins in the `plugins` directory at the root of your " +
    "Redmine directory (#{File.join(Rails.root, "plugins")})"
  exit 1
end
{% endhighlight %}

That's it - you have free bugtracker on the internet. Check it out: [http://redmine-todo.heroku.com](http://redmine-todo.heroku.com).

## Conclusion

Bundle with **Redmine** and **Heroku** perfectly appropriate for developers who wanted to save money and have a good bugtracker. But if your project is opensource and there is no matter to hide your project in the internet you can use [free hosted redmine](http://www.hostedredmine.com/) or [Pivotal Tracker](https://www.pivotaltracker.com).