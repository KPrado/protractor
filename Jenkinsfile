pipeline {
    agent {
        docker {
            image 'node:8-alpine'
        }
    }
    stages {
        stage('Run Test') {
            steps{
                sh "npm install"
                sh "npm install webdriver-manager -g"
                sh "npm run wdup"
                sh "npm test"
            }
        }
    }
}