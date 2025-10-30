---
title: Jenkins Pipelines Setup
sidebar_position: 5
---

In this section, we'll create **four pipelines** inside Jenkins that will handle both build and Docker image creation for the frontend and backend.

### Overview

| Pipeline Name | Purpose |
|----------------|----------|
| `frontend-app-build` | Builds the Angular app and copies output to artifacts |
| `frontend-docker-image` | Builds a Docker image from the frontend artifacts |
| `backend-app-build` | Builds the Spring Boot backend JAR and copies it to artifacts |
| `backend-docker-image` | Builds a Docker image for the backend using the built JAR |

---

## 1. Prerequisite: Folder Structure

Create a root directory (example: `D:\iris-code\ci-cd-demo`) with this structure:

```text
D:\iris-code\ci-cd-demo\
│
├── angular\
│   ├── src\
│   ├── package.json
│   ├── Dockerfile.frontend
│
├── backend\
│   ├── src\
│   ├── pom.xml
│   ├── Dockerfile.backend
│
├── artifacts\
│   ├── frontend\
│   ├── backend\
│
└── docker-compose.yml
```

In Jenkins, create a **folder** named **Demo** and place all 4 pipelines inside it.

---

## 2. Pipeline: Frontend App Build

**Name:** `frontend-app-build`

This pipeline installs dependencies, builds the Angular app, and copies the production-ready files into the artifacts directory.

```groovy
pipeline {
    agent any

    environment {
        FRONTEND_DIR = "D:/iris-code/ci-cd-demo/angular"
        DIST_OUTPUT_DIR = "D:/iris-code/ci-cd-demo/angular/dist"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo "Cleaning previous build..."
                bat "rmdir /s /q dist || exit 0"
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo "Installing npm packages..."
                    bat "pnpm install"
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo "Building Angular for production..."
                    bat "pnpm run build"
                }
            }
        }

        stage('Copy Build Output') {
            steps {
                script {
                    def source = 'D:/iris-code/ci-cd-demo/angular/dist'
                    def target = 'D:/iris-code/ci-cd-demo/artifacts/frontend'

                    bat """
                    if not exist "${target}" mkdir "${target}"
                    xcopy "${source}" "${target}" /E /I /Y
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend build completed successfully."
        }
        failure {
            echo "❌ Frontend build failed. Check logs."
        }
    }
}
```

---

## 3. Pipeline: Frontend Docker Image

**Name:** `frontend-docker-image`

This pipeline builds a Docker image from the frontend build output.

```groovy
pipeline {
    agent any

    environment {
        APP_NAME = "demo-frontend"
        IMAGE_TAG = "${BUILD_ID}"
        DOCKERFILE_PATH = "D:\\iris-code\\ci-cd-demo\\angular\\Dockerfile.frontend"
        CONTEXT_PATH = "D:\\iris-code\\ci-cd-demo"
        IMAGE_NAME = "${APP_NAME}:${IMAGE_TAG}"
    }

    stages {
        stage('Preparation') {
            steps {
                echo "🔍 Checking artifacts directory..."
                bat "dir \"${CONTEXT_PATH}\" || exit 1"
                echo "✅ Artifacts found successfully."
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image: ${IMAGE_NAME}"
                bat """
                    docker build ^
                        -t ${IMAGE_NAME} ^
                        -f "${DOCKERFILE_PATH}" ^
                        "${CONTEXT_PATH}"
                """
                echo "✅ Docker image built successfully: ${IMAGE_NAME}"
            }
        }

        stage('Verify Image') {
            steps {
                echo "🔎 Listing Docker images..."
                bat "docker images | findstr ${APP_NAME}"
            }
        }
    }

    post {
        success {
            echo "🎯 Frontend image build completed successfully."
        }
        failure {
            echo "❌ Frontend image build failed. Check logs."
        }
    }
}
```

---

## 4. Pipeline: Backend App Build

**Name:** `backend-app-build`

This pipeline builds the Spring Boot backend JAR and copies it into the artifacts folder.

```groovy
pipeline {
    agent any

    environment {
        APP_NAME = "demo-backend"
        BACKEND_PATH = "D:\\iris-code\\ci-cd-demo\\backend"
        ARTIFACT_PATH = "D:\\iris-code\\ci-cd-demo\\artifacts\\backend"
    }

    stages {
        stage('Cleanup') {
            steps {
                echo "🧹 Cleaning old backend artifacts..."
                bat "rmdir /s /q \"${ARTIFACT_PATH}\" || exit 0"
                bat "mkdir \"${ARTIFACT_PATH}\""
            }
        }

        stage('Build JAR') {
            steps {
                echo "⚙️ Building backend using Maven..."
                dir("${BACKEND_PATH}") {
                    bat "mvn clean package -DskipTests"
                }
            }
        }

        stage('Copy Artifact') {
            steps {
                echo "📦 Copying JAR to artifacts directory..."
                bat """
                    for /r ${BACKEND_PATH}\\target %%f in (*.jar) do (
                        copy /Y "%%f" "${ARTIFACT_PATH}\\backend.jar"
                    )
                """
            }
        }

        stage('Verify Artifact') {
            steps {
                echo "🔍 Listing artifact contents..."
                bat "dir \"${ARTIFACT_PATH}\""
            }
        }
    }

    post {
        success {
            echo "✅ Backend build successful. Artifact stored in: ${ARTIFACT_PATH}"
        }
        failure {
            echo "❌ Backend build failed. Check logs."
        }
    }
}
```

---

## 5. Pipeline: Backend Docker Image

**Name:** `backend-docker-image`

This pipeline creates a Docker image from the backend JAR artifact.

```groovy
pipeline {
    agent any

    environment {
        APP_NAME = "demo-backend"
        IMAGE_TAG = "${BUILD_ID}"
        DOCKERFILE_PATH = "D:\\iris-code\\ci-cd-demo\\backend\\Dockerfile.backend"
        CONTEXT_PATH = "D:\\iris-code\\ci-cd-demo"
    }

    stages {
        stage('Preparation') {
            steps {
                echo "🔍 Checking JAR artifacts..."
                bat "dir \"${CONTEXT_PATH}\\artifacts\\backend\" || exit 1"
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building backend Docker image..."
                bat """
                    docker build ^
                        -t ${APP_NAME}:${IMAGE_TAG} ^
                        -f "${DOCKERFILE_PATH}" ^
                        "${CONTEXT_PATH}"
                """
            }
        }

        stage('Verify Image') {
            steps {
                echo "🔎 Listing Docker images..."
                bat "docker images | findstr ${APP_NAME}"
            }
        }
    }

    post {
        success {
            echo "🎯 Backend image built successfully."
        }
        failure {
            echo "❌ Backend image build failed. Check logs."
        }
    }
}
```

---

## 6. Next Steps

Once all four pipelines are tested and verified, you’ll have:
- Built Angular app artifacts  
- Built backend JAR  
- Created Docker images for both frontend and backend

Next, we’ll configure **Docker Compose** to deploy both containers together and simulate a real CI/CD deployment environment.
