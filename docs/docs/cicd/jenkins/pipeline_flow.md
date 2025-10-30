---
title: Pipeline Flow
sidebar_position: 5
---

The Jenkins environment uses multiple pipelines to automate build and deployment.

### Pipeline Flow
1. **Code Checkout** – Jenkins pulls the latest code from GitHub.  
2. **Build Stage** – compiles Angular / Spring Boot apps.  
3. **Docker Build** – creates Docker images.  
4. **Push to ECR** – uploads image to AWS repository.  
5. **Server Update** – operations team pulls new image and updates docker-compose.yml.  

### Manual Trigger
All pipelines are triggered manually for production builds.  
Developers can select a branch, commit, or tag before build execution.

### Image Verification
After the push, confirm the new image tag exists:
```bash
aws ecr describe-images --repository-name iris-frontend --region ap-south-1
```
