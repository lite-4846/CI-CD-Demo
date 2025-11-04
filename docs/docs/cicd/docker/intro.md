---
title: Overview
sidebar_position: 1
---

Docker is the containerization platform used to package and run all Application components.  
Each service (frontend, backend, webform) runs inside its own container built from a Docker image.

### Why we use Docker
- Ensures the same environment across all servers.
- Simplifies deployments — build once, run anywhere.
- Makes rollback or scaling simple (just pull a specific image tag).

### How Some Project uses Docker
- **Frontend Image** → contains two Angular applications.
- **Backend Image** → contains three Spring Boot services.
- **Webform Image** → managed by another team.
- **Postgres** → runs on a separate server, not containerized.

These images are built using Jenkins pipelines and stored in **AWS ECR**.  
At deployment, the latest images are pulled and run using `docker-compose.yml`.
