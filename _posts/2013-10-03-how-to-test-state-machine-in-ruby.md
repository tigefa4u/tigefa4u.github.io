---
layout: post
title: "How to test state machine in Ruby"
description: "I've invented approach which rids of headache of testing state machine in Ruby.
This solution is only for RSpec now, but approach can be used for test unit as well."
tags: [rspec, ruby]
---
{% include JB/setup %}
I could not find any worth solution how to test [state machinee](https://github.com/pluginaweek/state_machine) with RSpec.
Until now I met only one solution which is proposed by [stackoverflow](http://stackoverflow.com/questions/3047630/rails-how-to-test-state-machine) habitants. But there are some disadvantages of this approach and in this post I will try to explain what are they and how
to avoid them.

## What we have

Assume that we have to simulate the following automatic gearbox shifting:

![Hyundai automatic gearshift](/images/gearshift.jpg)

This image will show which operations and states we have:

![Gearbox levels](/images/state_machine.jpg)

I use this [state machine gem](https://github.com/pluginaweek/state_machine) and RSpec for tests. And this is how looks possible class
with gearshift levels flow:

{% highlight ruby %}
class GearBox
  state_machine :gear, :initial => :P do
    event :switch_to_r do
      transition [:P, :N] => :R
    end

    event :switch_to_n do
      transition [:R, :D] => :N
    end

    event :switch_to_d do
      transition :N => :D
    end

    event :switch_to_p do
      transition :R => :P
    end
  end
end
{% endhighlight %}

## Headache

[Stackoverflowers proposes](http://stackoverflow.com/questions/3047630/rails-how-to-test-state-machine) to build object and then change state step by step with generated method-events. The possible
tests for this situation would look like this:

{% highlight ruby %}
describe Gearbox do
  it 'initial state should be P' do
    should be_p
  end

  it '#switch_to_r changes level to R from P and N' do
    subject.gear = 'P'
    expect { subject.switch_to_r }.to change(subject, :gear).from('P').to('R')

    subject.gear = 'N'
    expect { subject.switch_to_r }.to change(subject, :gear).from('N').to('R')
  end

  it '#switch_to_n changes level to N from R and D' do
    subject.gear = 'R'
    expect { subject.switch_to_n }.to change(subject, :gear).from('R').to('N')

    subject.gear = 'D'
    expect { subject.switch_to_n }.to change(subject, :gear).from('D').to('N')
  end

  it '#switch_to_d changes level to D from N' do
    subject.gear = 'N'
    expect { subject.switch_to_d }.to change(subject, :gear).from('N').to('D')
  end

  it '#switch_to_p changes level to P from R' do
    subject.gear = 'R'
    expect { subject.switch_to_p }.to change(subject, :gear).from('R').to('P')
  end
end
{% endhighlight %}

No so much code, but it has some problems:

1. It's not readable and it's very easy to miss some typo because of a lot of calls method-events (switch_to_r, switch_to_d, and etc.).
It looks like we test not state machine but some field which is changed by some method rather than test events and what they do
2. We have to worry about how the state machine works: we set `gear` to appropriate state for any test
3. If we change state name we will have to fix ALL these tests
4. If the `subject` doesn't have appropriate state a test will be failed

I used to this approach till now but every time I had issues with maintaining tests like above. Eventually I decided to invent some DSL which helps me to get rid of these problems forever. Hopefully I found solution and I'm going to share it with you in this post. Also I would like to know your opinion about it.

## Use custom matcher

I hope you know that RSpec has mechanism which allows to [create your custom matchers](https://github.com/dchelimsky/rspec/wiki/Custom-Matchers). I'm inspired how the [should-matchers](https://github.com/thoughtbot/shoulda-matchers) is written and how it helps to test my Rails code. So I decided to create some matcher as [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers) provides:

{% highlight ruby %}
RSpec::Matchers.define :have_transition do |transition|
  match do |model|
    transition = OpenStruct(transition)
    events = model.class.state_machines[transition.state_field].events
    event = events[transition.name]

    events.valid_for(model, :from => transition.from, :to => transition.to) == [event]
  end

  def OpenStruct(params)
    params.is_a?(OpenStruct) ? params : OpenStruct.new(params)
  end
end
{% endhighlight %}

Let's see how it can help us to test the given state flow:

{% highlight ruby %}
describe GearBox do
  context '#gear'
    let(:from_p_to_r) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_r,
        :from => :P,
        :to => :R
      })
    end

    let(:from_n_to_r) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_r,
        :from => :N,
        :to => :R
      })
    end

    let(:from_r_to_n) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_n,
        :from => :R,
        :to => :N
      })
    end

    let(:from_d_to_n) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_n,
        :from => :D,
        :to => :N
      })
    end

    let(:from_n_to_d) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_d,
        :from => :n,
        :to => :d
      })
    end

    let(:from_r_to_p) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_p,
        :from => :R,
        :to => :P
      })
    end

    it { should be_p } # check initial gear
    it { should have_transition from_p_to_r }
    it { should have_transition from_n_to_r }
    it { should have_transition from_r_to_n }
    it { should have_transition from_d_to_n }
    it { should have_transition from_n_to_d }
    it { should have_transition from_r_to_p }
  end
end
{% endhighlight %}

Obviously that we have much more code, but it's readable, maintainable, the tests says about what they do without any description. If we change state machine's field all what we have to do is to change input data for tests. By the way, we can move our input data (I mean all let's) to [shared example](https://www.relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples). And then if we had many classes with similar state flow we would use this shared example there.

## Conclusion

With this approach I forgot my troubles with testing state machine and created reusable solution which I always will use in my code from now. I have an idea to create gem for this but I'm not sure that it will have any popularity. If you like this solution, please, let me know about it. Thank you for your attention!

I've created [gist](https://gist.github.com/ka8725/6794542) for this solution.


UPDATE: I've invented much easier solution. It's much easier and elegant. Check [it out](https://gist.github.com/ka8725/7943510)