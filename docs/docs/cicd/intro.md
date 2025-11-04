---
title: Overview
sidebar_position: 1
---

# ⚙️ CI/CD

This section explains how **Jenkins** and **Docker** are integrated in the ecosystem to automate build, image creation, and deployment workflows across environments.

---

## 🔧 Overview

The CI/CD pipeline ensures that every code change is automatically built, containerized, and deployed with consistency.  
Our infrastructure uses:

- **Jenkins:** Core automation server that runs builds and deployment pipelines.  
- **Docker:** Containerization platform for frontend (Angular) and backend (Spring Boot) services.  
- **ECR (Elastic Container Registry):** Central repository for storing Docker images.  
- **Docker Repository:** Holds shared Dockerfiles, shell scripts, and Nginx configs used during builds.

---

## 🧩 Components Involved

| Component | Description |
|------------|--------------|
| **Frontend** | Two Angular apps, built and containerized through dedicated Jenkins pipelines. |
| **Backend** | Three Spring Boot services, built as JARs and containerized separately. |
| **Webform** | Managed by another team but integrated within deployment pipelines. |
| **PostgreSQL** | Hosted separately; credentials provided to backend containers at runtime. |

---

## 🚀 CI/CD Flow (End-to-End)

1. **Code Fetching**  
   Jenkins pulls code and Jenkinsfiles from AWS Git repositories using stored credentials.

2. **Build Process**  
   Each project (frontend, backend, etc.) has its own pipeline that compiles the app and generates artifacts (dist folder, JARs).

3. **Image Creation**  
   Separate pipelines use these artifacts to build Docker images using Dockerfiles from the **Docker repo**.

4. **Image Push**  
   Built images are tagged and pushed to **AWS ECR** using Jenkins credentials.

5. **Deployment**  
   Deployment servers pull updated images, modify the `docker-compose.yml` with new image tags, and restart containers.

6. **Runtime**  
   Final deployment runs entirely in containers (Angular + Spring Boot), communicating with a remote Postgres server.

---

## 🔒 Credentials & Access

- All sensitive credentials (AWS, Git, Docker, etc.) are managed in **Jenkins Credentials Manager**.  
- Pipelines use these credentials automatically to push images or pull code.

---

## 🧠 Triggers & Control

- Pipelines are **manually triggered** from Jenkins dashboard.  
- Each pipeline corresponds to a specific component (frontend, backend, webform, etc.).  
- Automated triggers (webhooks) may be added later for CI optimization.

---

## 🧰 Documentation Roadmap

| Section | Description |
|----------|--------------|
| [Docker](docker/intro) | Containerization setup, Dockerfiles, and docker-compose structure. |
| [Jenkins](jenkins/overview) | Jenkins pipeline, credentials, and job configuration details. |
| [Demo](demo/overview) | Localized version of this setup (Angular + Spring Boot + Postgres) for testing and learning. |

---

> This documentation is focused on replicating and understanding the CI/CD.  
> All configurations and examples mirror the production setup as closely as possible.
