---
title: Overview
sidebar_position: 1
---

Jenkins is the automation server used to build, test, and deploy all IRIS-Instant services.  
It pulls the latest code from Git, builds Docker images, and pushes them to AWS ECR for deployment.

### Why We Use Jenkins
- Continuous Integration – every commit triggers a build and test.
- Continuous Delivery – pipelines automate the entire release cycle.
- Centralized Control – credentials, logs, and configurations are managed in one place.

In our setup, Jenkins runs directly on a host server (port 8080) and uses Docker as the build environment.
