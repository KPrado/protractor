pipeline {
    agent {
        docker {
            image 'node:8-alpine'
            args '--link selenium_server'
        }
    }
    stages {
        stage('Run Test') {
            steps{
                sh "npm install"
                sh "npm install webdriver-manager -g"
                sh "npm run wdup"
                sh "npm test"
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}