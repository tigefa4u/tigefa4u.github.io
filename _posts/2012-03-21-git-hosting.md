---
layout: post
title: "Git hosting"
description: "Are you looking for free git hosting? Or, may be, do you want to find mercurial hosting? Do you want to find unfuddle VCS unlike github.com? If you answer yes at least for one of these questions this post will be useful for you. You are welcome!"
tags: [git, hosting]
---
{% include JB/setup %}

Since I've found my **github** repository instead of my project in **google** I started to search **free git hosting** which would allow to hide my projects from **google crawl**. And I wondered when I found a lot of satisfied for me services. One of them I will describe in this article it is **bitbucket**.

## Introduction

**Bitbucket** is the both **mercurial** and **git hosting** with **unlimited number of private projects** and **unlimited disk space** per account! This system has written by Alassian company (JIRA and Confluence founder). Go to their [site](http://bitbucket.org/) and check it out.

## Pricing
![BitBucket pricing](/images/bitbucket.jpg)

> It can be expired screenshot. To know actual pricing please, follow [bitbucket site](/images/bitbucket.jpg).

As you see for free account you have constrain - maximum 5 users with write access to your project. 5 members for one team are very big number. If this plan won't be enough you can buy the next plan with 10 collabarators for 10$ per month. Compare with github price - 24$ per month for 10 collabarators and 20 projects, but here you have unlimit number of private projects and unlimit disk space. It is very cheap and tempting offer!

## Sign up

It is very easy to sign up here. OpenID is available through services:

* Google
* Yahoo!
* AOL
* OpenID
* MyOpenID
* LiveJournal
* Flickr
* WordPress
* VeriSign
* ClaimID

After sign up you are able to create repository.

## Migrate from github

It is very easy to create git repository here. You have 2 choices: create project from scratch like you do it on **github** or import existing repository from **github**, **Google code**, **Mercurial**, **SourceForge** or **Subversion**. I preffered import my source code from **github**:

1. Type url for your public repo. If you want to migrate private repo you should check _Requires authorization_ checkbox and fill in *username* and *password* for your github account
2. Type repository name which will be used by **bitbucket**. You are also able to check if this repo will be **private** or **public**. Select VCS: **git** ot **mercurial**
3. You are able also check **issues tracking** and **Wiki pages**
4. Select then main programming language for your repository. Also you can write **description** and set **website url**

And that's it! Press **Import** button, wait while **bitbucket** fetch code from **github**. Nice feature - you can migrate your existing source code from **github** in several minutes. Don't forget to add your ssh key for **bitbucket** account if you want to commit in the migrated repository.

## Alternatives

Theare many another similiar services:

* [Unfuddle](http://unfuddle.com/)
* [repositoryhosting.com](http://repositoryhosting.com/)
* [Assembla](http://www.assembla.com/)
* [Beanstalkapp](http://beanstalkapp.com/)
* [InDefero](http://www.indefero.net/)
* [Project Locker](http://www.projectlocker.com/)
* [Codebase](http://www.codebasehq.com/)
* [Springloops](http://www.springloops.com/v2)
* [Gitorius](http://gitorious.org/)
* [SourceRepo](http://sourcerepo.com/)
* [Bettercodes](http://bettercodes.org/)
* [Codeplane](https://codeplane.com/)
* [Codesion](http://codesion.com/)
* [XP-dev](http://xp-dev.com/)

But they have a more constrains or bigger price. So my choice is **bitbucket**!
