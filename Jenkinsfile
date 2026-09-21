pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ramyabharathit/employee-management-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t employee-management-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker stop employee-app || true
                    docker rm employee-app || true
                    docker run -d -p 8080:80 --name employee-app employee-management-app
                '''
            }
        }
    }
}