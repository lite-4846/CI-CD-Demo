pipeline {
    agent any

    environment {
        FRONTEND_JOB = "frontend-pipeline"
        BACKEND_JOB = "backend-pipeline"
        DEPLOY_PATH = "/home/irisdev"
        REPO_URL = "https://github.com/lite-4846/CI-CD-Demo.git"
    }

    triggers {
        // Poll GitHub for new commits every 5 minutes
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Check for Changes') {
            steps {
                echo "Checking for new commits in repo..."
                checkout scm
                script {
                    echo "Changes detected, proceeding with pipeline."
                }
            }
        }

        stage('Trigger Frontend & Backend Builds') {
          stage('Frontend Build') {
              steps {
                  echo "Triggering frontend pipeline..."
                  build job: "${FRONTEND_JOB}", propagate: true, wait: true
              }
          }
          stage('Backend Build') {
              steps {
                  echo "Triggering backend pipeline..."
                  build job: "${BACKEND_JOB}", propagate: true, wait: true
              }
          }
        }

        stage('Prepare Deployment Files') {
            steps {
                echo "Copying deployment files (.env and docker-compose.yml)..."
                sh '''
                if [ -d "${DEPLOY_PATH}" ]; then
                    echo "Copying files to ${DEPLOY_PATH}"
                    cp -f docker-compose.yml ${DEPLOY_PATH}/
                    cp -f .env ${DEPLOY_PATH}/
                else
                    echo "❌ Deployment path not found: ${DEPLOY_PATH}"
                    exit 1
                fi
                '''
            }
        }

        stage('Deploy Updated Containers') {
            steps {
                echo "Deploying new containers using docker-compose..."
                sh '''
                cd ${DEPLOY_PATH}
                docker compose down
                docker compose up -d --build
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
