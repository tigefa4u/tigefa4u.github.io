---
layout: post
title: "Rule to use belongs_to with presence validator"
description: "This post describes rules of thumb how to use presence validator for belongs_to association in Rails. Do you know what pass to validates (or validate_presence_of) method for belongs_to association? You will figure out it in this post."
tags: [rails, validator]
---

I've always wondered which argument pass to validates method for model which hash *belongs_to* association: *association name* or *field name* (Rails names it as a foreign_key). Do you know? Have you ever been asked this question? I know the answer for this question and of course I will share my idea with you in this post.

## Association name of foreign key?

Assume we have to models: `Account` and `User`. Account has mane users and user belongs to account. The code below:

{% highlight ruby %}
class Account < ActiveRecord::Base
  has_one :user
end

class User < ActiveRecord::Base
  belongs_to :account
end
{% endhighlight %}

We want to add validation for user to check if account is presented. And it can be achieved with two ways:

* We can add user User class presence validator for association name:

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account, :presence => true
end
{% endhighlight %}

* Or we can add presence valitator for foreign key:

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account_id, :presence => true
end
{% endhighlight %}

Which way do you use? Do you know what is difference between them? Let's check it in rails console.

### 1.1. Foreign key way

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account_id, :presence => true
end
{% endhighlight %}

{% highlight ruby %}
irb(main):001:0> Account.destroy_all # Destroy all accounts in the DB
irb(main):002:0> Account.create(:id => 1)
irb(main):003:0> u = User.new(:account_id => 100)
irb(main):004:0> u.valid? # => true
irb(main):005:0> Account.exists?(100) # => nil - make sure that there is no account with id = 100
{% endhighlight %}

This test shows us one idea - presence validator for foreign key don't care about record existence. It means that you are able to pass *account_id* from form (for example, or API) with any value and ActiveRecord will save it silently. It's obvious that it's a hole in the application! Let's say now what happens with second approach.

### Association name way

{% highlight ruby %}
class User < ActiveRecord::Base
  belongs_to :account
  validates :account, :presence => true
end
{% endhighlight %}

{% highlight ruby %}
irb(main):001:0> Account.destroy_all
irb(main):002:0> Account.create(:id => 1)
irb(main):003:0> u = User.new(:account_id => 100)
irb(main):004:0> u.valid? # => false
irb(main):005:0> Account.exists?(100) # => nil
irb(main):006:0> u.errors.full_messages # => ["Account can't be blank"]
irb(main):007:0> u.account_id = 1 # => 1
irb(main):008:0> u.valid? # => true
irb(main):009:0> u.account_id = nil
irb(main):010:0> u.save # => false
irb(main):026:0> u.account = Account.new
irb(main):026:0> u.save # => true - this record has saved because account doesn't have validations at all. If it had the user wouldn't be saved never!
{% endhighlight %}

This approach obviously is more robust - this validation cares about associated object existence, foreign key presence and also automatically validated associated object.

### Conclusion

As you see 1st approach can bring the security issue and database inconsistency. So the answer is the following: **use *association name* for presence validator.**
