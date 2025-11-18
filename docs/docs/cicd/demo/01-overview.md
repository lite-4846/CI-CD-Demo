---
title: "Project Overview"
sidebar_position: 1
---

### Purpose
This document provides a top-level understanding of the **Demo Application** setup.  
It explains how the frontend, backend, and supporting infrastructure (Docker, Nginx, Jenkins) interact to deliver a complete CI/CD-driven full-stack deployment.

---

### Architecture Summary
The system is composed of three primary services:

1. **Frontend (Angular 20)**  
   - Hosted under **`localhost/demo`**.  
   - Built using Angular CLI and served as static assets via **Nginx**.

2. **Backend (Spring Boot)**  
   - Exposed internally on port **`8181`**, accessible externally through **`/backend/api/`**.  
   - Uses PostgreSQL (local DB: `demo_db`) for persistent storage. (Edit: In new setup the postgres is setup as docker container with volumes)  
   - Configured to use environment variables through a `.env` file at runtime.

3. **Nginx Reverse Proxy**  
   - Redirects root (`/`) → `/demo`  
   - Serves Angular frontend from `/demo`  
   - Proxies backend API requests under `/backend/api/`  
   - Adds required **CORS** and HTTP headers for smooth integration.  
   - Acts as the single entry point to the system.

4. **Docker Compose**  
   Handles multi-container orchestration for frontend and backend through a private network `demo-net`.  
   Both services are containerized, ensuring isolation and easy redeployment.

---

### Flow Summary

1. **User Access**  
   - Opens `http://localhost`  
   - Redirected to `/demo` where Angular runs.

2. **Frontend Request**  
   - Angular sends REST calls to `/backend/api/...`

3. **Proxy Handling**  
   - Nginx forwards API requests to internal backend container (`backend:8181`).

4. **Backend Response**  
   - Response is proxied back to frontend → displayed to user.

---

### Docker Overview

**Nginx Configuration:**
- Redirect root (`/`) → `/demo`
- Serve static files under `/demo/angular/dist/demo/browser`
- Forward `/backend/api/` to backend container
- Add CORS headers for all origins

**Docker Compose Overview:**
- **`backend`** → runs Spring Boot app
- **`frontend`** → runs Nginx serving Angular build
- **Network:** `demo-net`
- **Port:** `80` exposed for frontend access

---

### Key Takeaways
- All requests flow through **Nginx**.  
- **Docker Compose** runs both frontend and backend containers in one command.  
- `.env` file centralizes configurations for Jenkins and backend.  
- The system demonstrates a **complete CI/CD pipeline** from build to deployment.
