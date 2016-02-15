---
layout: post
title: "Parse CSV with column names"
description: "There is a convenient and robust way in ruby to parse CSV rather than using column indexes. If you have in CSV header as a first row you can use it in your code"
tags: [ruby]
categories: ruby
---

Say you have CSV with header as a first row. It contains column names. And you have to parse this CSV. I have always been seeing code which solve this problem but it's not so convenient and reliable as I wanted. The solution was unreliable and unmaintainable because there were hard-coded indexes for the columns: 0, 1, 2, ... and etc. I decided to figure out how to use provided column names instead of numeric indexes. So welcome on broad.

# Simple solution

Let's we have this CSV:

{% highlight ruby %}
Make; Model; Year
Audi; 80; 1994
Audi; A6; 2005
BMW; 740; 2001
{% endhighlight %}

The simplest solution with disadvantages will look like this:

{% highlight ruby %}
CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
  Car.create(:make => row[0], :model => row[1], :year => row[2])
end
{% endhighlight %}

Disadvantages of this solution are obvious: if columns' order changes you will get wrong system behavior and fail.

# Robust solution

See how is simple to write more reliable code which solves this problem:

{% highlight ruby %}
CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
  Car.create(:make => row['Make'], :model => row['Model'], :year => row['Year'])
end
{% endhighlight %}

Pay attention that you are not able to get values of row through original string representation in symbols (:Make, :Model or :Year) and even through underscored strings/symbols ('make' or :make). To achieve this you should make monkey patch which resolves this problem. I won't provide it here - it's up to you.

This solution is more reliable - it's ready for columns' order changes, it's readable for humans, it's not sensible for number of columns. But there is a still possible fail - if there is a mistake in header of CSV this solution will fail too. In this case I can give only one advice - to check header, read column names before parsing. `CSV.foreach` methods receive more parameters, you can find their [here](http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html).

PS. Firstly I've reinvented bicycle which reads first row and creates hash of indexes for each column (underscored symbol of column name as a key and index number as a value), but [@avsej](http://github.com/avsej) proposed me this solution. Despite the fact that I didn't find the solution from examples or official docs I've learned on more lesson here - don't invent bicycle. Thanks for [@avsej](http://github.com/avsej)!
