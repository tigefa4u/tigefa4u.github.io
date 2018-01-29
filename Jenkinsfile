pipeline {
  agent {
    node {
      label 'ubuntu'
    }
    
  }
  stages {
    stage('build') {
      steps {
        sh '''bash -l
source ~/.rvm/scripts/rvm
rvm use 2.4.3 --install --binary --fuzzy
gem install bundler --pre --no-document
bundle install'''
      }
    }
  }
}