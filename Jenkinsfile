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
rvm use 2.4.3 --install --binary --fuzzy
gem install bundler --pre --no-document
bundle install'''
      }
    }
  }
}