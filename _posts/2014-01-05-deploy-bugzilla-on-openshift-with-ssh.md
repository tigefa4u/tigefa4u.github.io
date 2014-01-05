---
layout: post
title: "Deploy Bugzilla on Openshift With SSH"
description: ""
category: bugzilla
tags: ['bugzilla', 'perl']
---

# How to get Bugzilla

Bugzilla and all of its source code are available for download below. Bugzilla is licensed under the [Mozilla Public License](http://www.mozilla.org/MPL/), and is thus both free and open source software.

Be sure to see the Installation and Configuration section of the [Bugzilla Guide](http://www.bugzilla.org/docs/) (there's also a copy included in the tarball).

If you want to know what's changed from one version to the next, [view the changelogs for Bugzilla](http://www.bugzilla.org/status/changes.html) (generated directly from the raw bzr checkin messages).

**Note for upgraders:** You can update to the newest release using the bzr instructions below. This is a good way to update if you've made local changes, as bzr will attempt to merge your changes with the current release (although you may have to do some merging yourself if it finds conflicts between what you changed and what we changed). Then, to complete your upgrade, read the "How to Upgrade Bugzilla" section in your release notes.

## Login On Openshift

~~~
rhc setup
~~~

## Create new app

~~~
rhc app create bugzilla perl-5 mysql-5 phpmyadmin-4
~~~

## Login app via `ssh`

~~~
rhc ssh bugzilla
~~~

### Change directory on path perl index website

~~~
cd app-root/runtime/repo/perl
~~~

#### Get the bugzilla source

##### Stable Release (4.4.1)
Bugzilla 4.4.1 is our current stable release in the 4.4 series.

~~~
wget http://ftp.mozilla.org/pub/mozilla.org/webtools/bugzilla-4.4.1.tar.gz && tar --strip-components=1 -zxvf *.tar.gz && rm *.tar.gz
~~~

##### Development Snapshot (4.5.1)

> Bugzilla 4.5.1 is our latest development snapshot leading to Bugzilla 5.0.
> Use of a development branch is **at your own risk.** 
> They receive very little testing, so expect this release to be unstable. 
> Users of 4.4 or older 4.5 releases are encouraged to try out new 4.5 releases in a testing environment and let us know of any problems that are found with the release.
> A look at the new features that will be in Bugzilla 5.0 can be found in our latest [Status Updates.](http://www.bugzilla.org/status/)

~~~
wget http://ftp.mozilla.org/pub/mozilla.org/webtools/bugzilla-4.5.1.tar.gz && tar --strip-components=1 -zxvf *.tar.gz && rm *.tar.gz
~~~

### Installing perl module

~~~
perl install-module.pl --all
~~~

### Create `localconfig`

~~~
perl checksetup.pl
~~~

Edit `localconfig` database connection

~~~
nano localconfig
~~~

and re run, install process it here, setting your login.

~~~
perl checksetup.pl
~~~

## Adding alias `dev.myproject.org` for example

~~~
rhc alias add bugzilla dev.myproject.org
~~~

see [dev.tigefa.org](http://dev.tigefa.org)

**the end**

