pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh '''/bin/bash -C source ~/.rvm/scripts/rvm
rvm use 2.4.3 --install --binary --fuzzy
gem install bundler --pre --no-document
bundle install'''
      }
    }
  }
}