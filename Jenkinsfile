pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'pranavreddy689'
        IMAGE_NAME = 'student-dashboard'
        KUBE_CONFIG = credentials('kubeconfig') // Jenkins credential ID (will set later)
        DOCKER_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo '📥 Cloning GitHub repository...'
                git branch: 'main', url: 'https://github.com/PranavReddy065/k8s-cicd-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest ./student-dashboard'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '📤 Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying to Kubernetes...'
                sh '''
                    kubectl apply -f k8s/base/deployment.yaml
                    kubectl apply -f k8s/base/service.yaml
                    kubectl rollout restart deployment student-dashboard-deployment
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
