# tigefa4u.github.io

[![Dependency Status](https://img.shields.io/gemnasium/tigefa4u/tigefa4u.github.io.png?style=flat)](https://gemnasium.com/tigefa4u/tigefa4u.github.io) [![Stories in Ready](https://badge.waffle.io/tigefa4u/tigefa4u.github.io.png?label=ready&title=Ready)](https://waffle.io/tigefa4u/tigefa4u.github.io)

![tigefa-logo](http://res.cloudinary.com/wvm/image/upload/v1389035830/tigefa_rbe6f7.png)

for personal notes build with jekyll.

follow [@sugeng_tigefa](http://twitter.com/sugeng_tigefa) [#tigefa](irc://irc.freenode.net/#tigefa)


## Build with

- [jekyll](http://jekyllrb.com) [@mojombo](https://github.com/mojombo)
- [bootstrap](http://getbootstrap.com) [@twbs](https://github.com/twbs)
- [Font-Awesome](http://fontawesome.io) [@FortAwesome](https://github.com/FortAwesome)
- [Poole](http://getpoole.com) [@poole](https://github.com/poole)

### License

- [The MIT License](https://github.com/tigefa4u/tigefa4u.github.io/blob/master/LICENSE)

#### lets begin with test

```shell
git clone https://github.com/tigefa4u/tigefa4u.github.io.git username.github.io.git
cd username.github.io
gem install bundler --no-ri --no-rdoc
bundle install
# edit _config.yml
bundle exec jekyll server
=> Now browse to http://localhost:4000

# Create post
bundle exec rake post title="A Title"
```

Syncing existing jekyll blog/site

```
cd username.github.io
git remote add tigefa4u -m master https://github.com/tigefa4u/tigefa4u.github.io.git
git pull -s recursive -X theirs tigefa4u master

gem install bundler --no-ri --no-rdoc
bundle install

bundle exec jekyll serve -w
```

[![Gittip](https://img.shields.io/gittip/tigefa4u.svg?style=flat)](https://www.gittip.com/tigefa4u/)
