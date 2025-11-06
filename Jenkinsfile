pipeline {
    agent any

    environment {
        FRONTEND_JOB = "frontend-pipeline"
        BACKEND_JOB = "backend-pipeline"
        DEPLOY_PATH = "/home/irisdev"
        BUILD_TAG = "build-${BUILD_NUMBER}"
    }

    triggers {
        // Poll GitHub for new commits every 5 minutes
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout Repository') {
            steps {
                echo "Checking for new commits in repository..."
                checkout scm
            }
        }

        stage('Trigger Frontend & Backend Builds') {
            parallel {
                stage('Frontend Build') {
                    steps {
                        echo "Triggering frontend pipeline..."
                        build job: "${FRONTEND_JOB}", propagate: true, wait: true, parameters: [string(name: 'IMAGE_TAG', value: "${BUILD_TAG}")]
                    }
                }
                stage('Backend Build') {
                    steps {
                        echo "Triggering backend pipeline..."
                        build job: "${BACKEND_JOB}", propagate: true, wait: true, parameters: [string(name: 'IMAGE_TAG', value: "${BUILD_TAG}")]
                    }
                }
            }
        }

        stage('Prepare Deployment Files') {
            steps {
                echo "Updating deployment environment..."
                sh '''
                  echo "Preparing deployment files in ${DEPLOY_PATH}"

                  # Update .env with new image tag and timestamp
                  sed -i '/^IMAGE_TAG=/d' .env || true
                  echo "IMAGE_TAG=${BUILD_TAG}" >> .env

                  sed -i '/^BUILD_TIME=/d' .env || true
                  echo "BUILD_TIME=$(date '+%Y-%m-%d_%H-%M-%S')" >> .env

                  # Copy required files
                  cp -f docker-compose.yml ${DEPLOY_PATH}/
                  cp -f .env ${DEPLOY_PATH}/
                '''
            }
        }

        stage('Deploy Updated Containers') {
            steps {
                echo "Deploying new containers using docker-compose..."
                sh '''
                docker compose down
                docker compose up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Verifying running containers..."
                sh "docker ps"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful. Both frontend and backend are updated."
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
