---
title: Jenkinsfile Structure
sidebar_position: 4
---

Each service (frontend, backend) includes its own Jenkinsfile that defines build and deployment stages.

### Example Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REPOSITORY = '1234567890.dkr.ecr.ap-south-1.amazonaws.com/iris-frontend'
        DOCKER_IMAGE = 'iris-frontend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/org/iris-frontend.git'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm install && npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage('Push to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-cred']]) {
                    sh '''
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY
                        docker tag $DOCKER_IMAGE:latest $ECR_REPOSITORY:latest
                        docker push $ECR_REPOSITORY:latest
                    '''
                }
            }
        }
    }
}
```

This pipeline pulls code, builds it, containers it, and pushes the image to AWS ECR.
