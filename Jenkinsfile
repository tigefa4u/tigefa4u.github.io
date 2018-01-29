pipeline {
  agent {
    node {
      label 'ubuntu'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh '''/bin/bash -l
whoami
pwd
sudo gem install bundler --pre --no-document
bundle install
bundle exec jekyll build'''
      }
    }
  }
}