[![Indonesia Travel](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjLkYmsse9kcPyT2s6yiGwf-GhR5py02DzKlUrpQQqaplTqP8ZOaNwILAQgXh3EzbdPP5ubDAkaNgnWK052Ua36OENvweBd93slIzotTZnF-t8OqCpmONxjSXY57yNK19pL1HBitd41Q2QIHtE0Xo9IWZlus3hJ0ZAbdaBN4lUnLz2W77soOCroUXp/s1600/pesonaindonesia.png)](https://www.indonesia.travel)

## tigefa4u.github.io

personal notes build with jekyll.

[![Build status](https://ci.appveyor.com/api/projects/status/rxb5xenbleq49v7s?svg=true)](https://ci.appveyor.com/project/tigefa4u/tigefa4u-github-io)
[![DOI](https://zenodo.org/badge/20320/tigefa4u/tigefa4u.github.io.svg)](https://zenodo.org/badge/latestdoi/20320/tigefa4u/tigefa4u.github.io)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/tigefa4u/tigefa4u.github.io/master/LICENSE)
[![Show me a Demo at Codio](https://codio-public.s3.amazonaws.com/sharing/open-in-ide.png)](https://codio.com/tigefa/tigefa4u)
[![Twitter Follow](https://img.shields.io/twitter/follow/sugengtigefa.svg?style=social&label=SugengTigefa)](https://twitter.com/intent/follow?screen_name=sugengtigefa)
[![Google Groups](https://img.shields.io/badge/Group-tigefa-blue.svg)](http://groups.google.com/group/tigefa)

## Built with

- [jekyll](http://jekyllrb.com) [@jekyll](https://github.com/jekyll)
- [Bootstrap](http://getbootstrap.com) [@twbs](https://github.com/twbs)

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

```shell
cd username.github.io
git remote add tigefa4u -m master https://github.com/tigefa4u/tigefa4u.github.io.git
git pull -s recursive -X theirs tigefa4u master

gem install bundler --no-ri --no-rdoc
bundle install

bundle exec jekyll serve -w
```

### License

- [The MIT License](https://github.com/tigefa4u/tigefa4u.github.io/blob/master/LICENSE)
