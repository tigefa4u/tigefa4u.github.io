# tigefa4u.github.io

[![Releases](https://img.shields.io/github/release/tigefa4u/tigefa4u.github.io.svg?style=flat)](https://github.com/tigefa4u/tigefa4u.github.io/releases) [![Dependency Status](https://img.shields.io/gemnasium/tigefa4u/tigefa4u.github.io.png?style=flat)](https://gemnasium.com/tigefa4u/tigefa4u.github.io) [![Stories in Ready](https://badge.waffle.io/tigefa4u/tigefa4u.github.io.png?label=ready&title=Ready)](https://waffle.io/tigefa4u/tigefa4u.github.io)

![tigefa-logo](http://res.cloudinary.com/wvm/image/upload/v1389035830/tigefa_rbe6f7.png)

for personal notes build with jekyll v1.3.1

follow [@sugeng_tigefa](http://twitter.com/sugeng_tigefa)


## Build with

- [jekyll](http://jekyllrb.com) [@mojombo](https://github.com/mojombo)
- [bootstrap](http://getbootstrap.com) [@twbs](https://github.com/twbs)
- [jekyll-bootstrap](http://jekyllbootstrap.com) [@plusjade](https://github.com/plusjade)
- [Font-Awesome](http://fontawesome.io) [@FortAwesome](https://github.com/FortAwesome)

## Releases

[![Releases](https://img.shields.io/github/release/tigefa4u/tigefa4u.github.io.png?style=flat)](https://github.com/tigefa4u/tigefa4u.github.io/releases)

### License

- [The MIT License](https://github.com/tigefa4u/tigefa4u.github.io/blob/master/LICENSE)

#### lets begin with test

```shell
git clone https://github.com/tigefa4u/tigefa4u.github.io.git username.github.io.git
cd username.github.io
gem install bundler --no-ri --no-rdoc
bundle install
# edit _config.yml
bundle exec jekyll server --watch
=> Now browse to http://localhost:4000

# Create post
bundle exec rake post title="A Title"
```

Syncing existing jekyll blog/site

```
cd username.github.io
git remote add upstream https://github.com/tigefa4u/tigefa4u.github.io.git
git remote -v
git fetch upstream
git merge upstream/master

gem install bundler --no-ri --no-rdoc
bundle install

bundle exec jekyll serve -w
```

[![Gittip](https://img.shields.io/gittip/tigefa4u.svg?style=flat)](https://www.gittip.com/tigefa4u/)
