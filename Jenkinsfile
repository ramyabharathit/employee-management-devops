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
                sh 'docker build -t ramyabharathi1804/employee-management-app:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push ramyabharathi1804/employee-management-app:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker stop employee-app || true
                    docker rm employee-app || true
                    docker run -d -p 80:80 --name employee-app ramyabharathi1804/employee-management-app:latest
                '''
            }
        }
    }
}