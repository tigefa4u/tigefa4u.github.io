---
layout: post
title: "Environment variables in Rails"
description: "The post about defining ENV variables in Rails. Explanation what does ENV['FOG_PROVIDER'] mean and how to configure Capistrano deployment with ENV variables"
tags: [rails, capistrano]
---

When you see configuration examples in gems README like this:

> This real example you can find in the README of awesome gem [assets_sync](https://github.com/rumblelabs/asset_sync).

{% highlight ruby %}
AssetSync.configure do |config|
  config.fog_provider = 'AWS'
  config.fog_directory = ENV['FOG_DIRECTORY']
  config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
  config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']

  # Don't delete files from the store
  # config.existing_remote_files = "keep"
  #
  # Increase upload performance by configuring your region
  # config.fog_region = 'eu-west-1'
  #
  # Automatically replace files with their equivalent gzip compressed version
  # config.gzip_compression = true
  #
  # Use the Rails generated 'manifest.yml' file to produce the list of files to
  # upload instead of searching the assets directory.
  # config.manifest = true
  #
  # Fail silently.  Useful for environments such as Heroku
  # config.fail_silently = true
end
{% endhighlight %}

what are they do you think?
Where should you define `ENV['FOG_DIRECTORY']`? Should you define it in the shell script (like `~/.bashrc`, `~/.bash_profile`, `~/.profile` and etc.) or may be in the `/etc/environment`? If you think so I have to disappoint you - you are wrong!

## Challenge

Let's define `FOG_DIRECTORY` variable in the `~/.bashrc` file:

> Pay attention if `~/.bashrc` includes line `[ -z "$PS1" ] && return` or equal you have to define variables above it

{% highlight bash %}
export FOG_DIRECTORY=my-bucket-name
{% endhighlight %}

Then reboot shell and start Rails application. You will see that application is configured correctly. You enjoy it and going to deploy application to the production on the VPS or VDS the same way and everything will be work there... before first reboot. Why `ENV['FOG_DIRECTORY']` is `nil` after server reboot? The answer is simple - [nginx](http://nginx.org/) or another web server (I don't know which one you use, but I prefer using **nginx**) starts before evaluating `~/.bashrc` and even `/etc/environment`.

If you use [assets_sync](https://github.com/rumblelabs/asset_sync) to upload your assets to the **cloud** you can have this error during deployment with capistrano](https://github.com/capistrano/capistrano):

{% highlight ruby %}
AssetSync: using default configuration from built-in initializer
rake aborted!
Fog provider can't be blank, Fog directory can't be blank

Tasks: TOP => assets:precompile:nondigest
(See full trace by running task with --trace)
{% endhighlight %}

So we have to looking for another way how to define these variables.

## Solution

Considering the problem above there is a reasonable question - what are these variables in config at all and what to do? How should we define these variables?

During surfing the Internet I've found a good [article](http://railsapps.github.com/rails-environment-variables.html) which explains cases how to achieve our goals.

I will describe here the case which I prefer because I think it is the simplest and faster than others.

Insert these lines of code to the **config/application.rb** after line `config.assets.version = '1.0'`:

{% highlight ruby %}
config.before_configuration do
  env_file = File.join(Rails.root, 'config', 'local_env.yml')
  YAML.load(File.open(env_file)).each do |key, value|
    ENV[key.to_s] = value
  end if File.exists?(env_file)
end
{% endhighlight %}


Now you have to create **yml** file in **config** folder and add it to **.gitignore** if you have to define these variables locally. Example of `config/local_env.yml`:

> Key values are not real, so it doesn't make sense to paste them in your configuration files

{% highlight ruby %}
FOG_PROVIDER: AWS
FOG_DIRECTORY: my-bycket-name
AWS_ACCESS_KEY_ID: ASFAWFSFDGSDEQWEFGD
AWS_SECRET_ACCESS_KEY: Afsdgd35gSFsdgSDF46GDSG4ghdf356
FOG_REGION: eu-west-1
{% endhighlight %}


And finally if we deploy application with **Capistrano** we have to deploy it properly. We should put **local_env.yml** to the **Capistrano** shared folder on the server and change **config/deploy.rb** like this:

{% highlight ruby %}
before 'deploy:assets:precompile', :symlink_config_files

desc "Link shared files"
task :symlink_config_files do
  symlinks = {
    "#{shared_path}/config/database.yml" => "#{release_path}/config/database.yml",
    "#{shared_path}/config/local_env.yml" => "#{release_path}/config/local_env.yml"
  }
  run symlinks.map{|from, to| "ln -nfs #{from} #{to}"}.join(" && ")
end
{% endhighlight %}


Here it is assumed that **local_env.yml** is existed in the **{shared_path}/config/** folder on the server. Check out here that I've done the same things with my **database.yml** config (by the way ignore the **database.yml** in your [CVS](http://en.wikipedia.org/wiki/Concurrent_Versions_System) it's the best practice too).