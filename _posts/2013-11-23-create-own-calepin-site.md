---
layout: post
title: "Create Own Calepin site"
description: "fork jokull/calepin and create own server or new service like calepin.co"
category: python
tags: ['calepin', 'python', 'pelican']
---

Quickstart
==========
- Source [jokull/calepin](https://github.com/jokull/calepin)

~~~shell
    $ git clone https://github.com/jokull/calepin.git or svn co https://github.com/jokull/calepin/trunk calepin
    $ cd calepin
    $ virtualenv --distribute venv
    $ source venv/bin/activate
    $ pip install -r requirements
    $ pwd > venv/lib/python2.7/site-packages/app.pth
~~~

Environment
-----------

Now add `.env` with the development environment and `source` it. It should include values for the following values:

~~~shell
    SECRET_KEY=
    CALEPIN_ADMIN= # Admin email
    CALEPIN_THEME= # See github.com/jokull/pelican-themes
    CALEPIN_ROOT= # The place where user files are synced and served from
    SQLALCHEMY_DATABASE_URI=postgresql://calepin@/calepin
    DROPBOX_APP_KEY=
    DROPBOX_SECRET=
    SENTRY_DSN= # Optional but good for production
    REDIS_URL = redis://
~~~

Components
==========

  + PostgreSQL
  + Redis
  + Flask api and frontend
  
## Source on Github

- [jokull/calepin](https://github.com/jokull/calepin)
