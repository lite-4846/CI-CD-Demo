---
title: Installation & Setup
sidebar_position: 3
---

If you want to replicate the Jenkins setup locally, follow these minimal steps:

### Step 1: Install Jenkins
```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
```

Note: The step-by-step guide for installing Jenkins on Windows is available in the Demo section. Refer to the Jenkins Installation (Windows) page for detailed setup instructions.

Access Jenkins at **http://localhost:8080**

### Step 2: Install Required Plugins
- Docker Pipeline  
- Git  
- Pipeline Utility Steps  
- AWS Credentials  

### Step 3: Configure Global Credentials
In **Manage Jenkins → Credentials**:
- Add AWS ECR Access Key + Secret.  
- Add GitHub credentials for pulling code.  
- Add Docker Hub (if needed).  

### Step 4: Add Node or Agent (Optional)
If your Jenkins is running builds on separate machines, configure them under:
**Manage Jenkins → Nodes and Clouds**
