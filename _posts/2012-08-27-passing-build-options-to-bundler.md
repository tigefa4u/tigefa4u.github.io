---
layout: post
title: "Passing build options to bundler"
description: "When you have to pass build options to bundler using bundler-config will solve your problems with very easy way."
tags: [ruby, bundler, gems]
---
{% include JB/setup %}

## Problem

Have you ever had exception dusing installing gems through bundler like below?

    Installing mysql2 (0.3.11) with native extensions
    Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.

            /usr/local/Cellar/rbenv/0.3.0/versions/1.9.3-p0/bin/ruby extconf.rb
    checking for rb_thread_blocking_region()... yes
    checking for rb_wait_for_single_fd()... yes
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lm... yes
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lz... yes
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lsocket... no
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lnsl... no
    checking for mysql_query() in -lmysqlclient... no
    checking for main() in -lmygcc... no
    checking for mysql_query() in -lmysqlclient... no
    *** extconf.rb failed ***
    Could not create Makefile due to some reason, probably lack of
    necessary libraries and/or headers.  Check the mkmf.log file for more
    details.  You may need configuration options.

    Provided configuration options:
      --with-opt-dir
      --without-opt-dir
      --with-opt-include
      --without-opt-include=${opt-dir}/include
      --with-opt-lib
      --without-opt-lib=${opt-dir}/lib
      --with-make-prog
      --without-make-prog
      --srcdir=.
      --curdir
      --ruby=/usr/local/Cellar/rbenv/0.3.0/versions/1.9.3-p0/bin/ruby
      --with-mysql-config
      --without-mysql-config
      --with-mysql-dir
      --without-mysql-dir
      --with-mysql-include
      --without-mysql-include=${mysql-dir}/include
      --with-mysql-lib
      --without-mysql-lib=${mysql-dir}/lib
      --with-mysqlclientlib
      --without-mysqlclientlib
      --with-mlib
      --without-mlib
      --with-mysqlclientlib
      --without-mysqlclientlib
      --with-zlib
      --without-zlib
      --with-mysqlclientlib
      --without-mysqlclientlib
      --with-socketlib
      --without-socketlib
      --with-mysqlclientlib
      --without-mysqlclientlib
      --with-nsllib
      --without-nsllib
      --with-mysqlclientlib
      --without-mysqlclientlib
      --with-mygcclib
      --without-mygcclib
      --with-mysqlclientlib
      --without-mysqlclientlib


    Gem files will remain installed in /usr/local/Cellar/rbenv/0.3.0/versions/1.9.3-p0/lib/ruby/gems/1.9.1/gems/mysql2-0.3.11 for inspection.
    Results logged to /usr/local/Cellar/rbenv/0.3.0/versions/1.9.3-p0/lib/ruby/gems/1.9.1/gems/mysql2-0.3.11/ext/mysql2/gem_make.out
    An error occured while installing mysql2 (0.3.11), and Bundler cannot continue.
    Make sure that `gem install mysql2 -v '0.3.11'` succeeds before bundling.

The problem solves by passing build options for this gem:

    $ gem install mysql -v '0.3.10' -- --with-mysql-config=/usr/local/Cellar/mysql/5.5.20/bin/mysql_config

But this solution is ugly because you have to install problematic gems independently from bundler and if you have a lot of ruby versions in
your operation system you will have to do it for each ruby version. But there is a another solution, much better this one.

## Solution

Just type in the terminal:

    bundle config build.mysql2  --with-mysql-config=/usr/local/Cellar/mysql/5.5.20/bin/mysql_config

And now you are able to install gems through bundler without issues:

    bundler install

That's it - you have installed all gems for your project. Full documentation is located [here](http://gembundler.com/man/bundle-config.1.html)
