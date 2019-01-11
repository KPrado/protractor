pipeline{
    agent{
        docker {
            image 'node:8-alpine'
        }
    }
    stager{
        stage('Run Test'){
            sh "npm install"
            sh "npm install webdriver-manager -g"
            sh "npm run wdup"
            sh "npm test"
        }
    }
}