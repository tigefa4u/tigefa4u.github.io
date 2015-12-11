# tigefa4u.github.io

personal notes build with jekyll.

[![Circle CI](https://circleci.com/gh/tigefa4u/tigefa4u.github.io.svg?style=svg)](https://circleci.com/gh/tigefa4u/tigefa4u.github.io) [![Build status](https://ci.appveyor.com/api/projects/status/rxb5xenbleq49v7s?svg=true)](https://ci.appveyor.com/project/tigefa4u/tigefa4u-github-io) [![Show me a Demo at Codio](https://codio-public.s3.amazonaws.com/sharing/open-in-ide.png)](https://codio.com/tigefa/tigefa4u)

![tigefa-logo](http://res.cloudinary.com/wvm/image/upload/v1389035830/tigefa_rbe6f7.png)

follow [@sugeng_tigefa](http://twitter.com/sugeng_tigefa) [Discussion group](http://groups.google.com/group/tigefa)


## Built with

- [jekyll](http://jekyllrb.com) [@jekyll](https://github.com/jekyll)
- [gayanvirajith/gaya](https://github.com/gayanvirajith/gaya)

### License

- [The MIT License](https://github.com/tigefa4u/tigefa4u.github.io/blob/master/LICENSE)

#### lets begin with test

```shell
git clone https://github.com/tigefa4u/tigefa4u.github.io.git username.github.io.git
cd username.github.io
gem install bundler --no-ri --no-rdoc
bundle install
# edit _config.yml
bundle exec jekyll server -w
=> Now browse to http://localhost:4000
```

#### Syncing existing jekyll blog/site

```
cd username.github.io
git remote add tigefa4u -m master https://github.com/tigefa4u/tigefa4u.github.io.git
git pull -s recursive -X theirs tigefa4u master

gem install bundler --no-ri --no-rdoc
bundle install

bundle exec jekyll serve -w
```

