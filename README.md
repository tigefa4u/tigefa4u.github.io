[tigefa4u.github.io](http://tigefa4u.github.io) [![Latest Stable Version](https://poser.pugx.org/tigefa4u/tigefa4u.github.io/v/stable.png)](https://packagist.org/packages/tigefa4u/tigefa4u.github.io) [![Dependency Status](https://gemnasium.com/tigefa4u/tigefa4u.github.io.png)](https://gemnasium.com/tigefa4u/tigefa4u.github.io)
====================

![tigefa-logo](http://res.cloudinary.com/wvm/image/upload/v1389035830/tigefa_rbe6f7.png)

for personal notes build with jekyll v1.2.1

follow [@tigefa_team](http://twitter.com/tigefa_team)


## Build with 

- [jekyll](http://jekyllrb.com) [@mojombo](https://github.com/mojombo)
- [bootstrap](http://getbootstrap.com) [@twbs](https://github.com/twbs)
- [jekyll-bootstrap](http://jekyllbootstrap.com) [@plusjade](https://github.com/plusjade)
- [Font-Awesome](http://fontawesome.io) [@FortAwesome](https://github.com/FortAwesome)

### License

- [the Public Domain license](https://github.com/tigefa4u/tigefa4u.github.io/blob/master/LICENSE)

#### lets begin with test

```shell
git clone https://github.com/tigefa4u/tigefa4u.github.io.git username.github.io.git
cd username.github.io.git
echo 'install: --no-ri --no-rdoc' >> ~/.gemrc
gem install bundler
bundle install
# edit _config.yml
bundle exec jekyll server --watch
=> Now browse to http://localhost:4000

# Create post
bundle exec rake post title="A Title"
```
