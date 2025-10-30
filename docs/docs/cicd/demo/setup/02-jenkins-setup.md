---
title: Jenkins Setup
sidebar_position: 2
---

This section will guide you through setting up Jenkins locally on **Windows** to run the demo pipelines.  
We are not connecting to GitHub or any external services — Jenkins will use local file paths to build and deploy.

---

### 1. Verify Required Tools

Before starting Jenkins, ensure these tools are installed and available in your system **PATH**.

```bash
java -version
mvn -version
git --version
docker --version
```

If any command fails, install the corresponding tool before continuing.

---

### 2. Install Jenkins

If Jenkins is not installed:
1. Download from the official [Jenkins website](https://www.jenkins.io/download/).
2. Choose the **Windows Installer** (.msi).
3. Run the installer and complete setup using the default port (8080).
4. Once installed, visit:  
   **http://localhost:8080**

---

### 3. Setup Local Jenkins Workspace

Your Jenkins instance will execute jobs directly using local file paths.  
Make sure the following project structure is available on your system (for example):

```text
D:\iris-code\ci-cd-demo\
│
├── angular\
├── backend\
├── artifacts\
└── docker-compose.yml
```

Each Jenkins pipeline will refer to these absolute paths when building or copying files.

---

### 4. Create Jenkins Folder

Inside Jenkins:
1. Click **New Item** → select **Folder** → name it **Demo**.
2. All demo pipelines will reside inside this folder:
   - frontend-app-build  
   - frontend-docker-image  
   - backend-app-build  
   - backend-docker-image

This keeps everything organized for our CI/CD demo.

---

### 5. Install Required Plugins

Go to **Manage Jenkins → Plugins → Available Plugins** and install:

- Pipeline  
- Pipeline: Stage View  
- Docker  
- Docker Pipeline  
- NodeJS  
- Maven Integration  
- Git  

Restart Jenkins once all plugins are installed.

---

### 6. Configure Tools (Optional)

If not automatically detected:
- **Manage Jenkins → Tools → JDK installations**  
  Add your JDK path.
- **Maven installations**  
  Add your Maven installation directory.

---

### 7. Verify Jenkinsfile Execution

To verify that Jenkins can run jobs correctly:
1. Create a simple pipeline job.
2. Copy-paste this script:
   ```groovy
   pipeline {
       agent any
       stages {
           stage('Verify') {
               steps {
                   echo "Jenkins and Docker setup verified successfully!"
               }
           }
       }
   }
   ```
3. Run the build.  
If successful, Jenkins is ready to execute your demo pipelines.

---

### 8. Next Steps

With Jenkins installed and configured locally, we can now:
- Add the **four pipeline jobs** (frontend + backend)
- Link them with **Docker** and **artifacts**
- Finally deploy using **docker-compose**

We'll cover these in the next Jenkins section.
