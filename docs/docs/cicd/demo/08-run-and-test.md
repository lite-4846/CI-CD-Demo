---
title: Running, Testing & Cleanup  
sidebar_position: 8
---

Once all builds and Docker configurations are ready, the final phase is **execution** — running, testing, and cleaning up your containers.  
This confirms the entire CI/CD flow works end-to-end from Jenkins to Docker Compose.

---

### 🏁 Step 1 — Navigate to Project Directory

All Docker commands must run from the **`ci-cd-demo`** directory since the `.env` and `docker-compose.yml` files live there.

```bash
cd D:/iris-code/ci-cd-demo
```

---

### 🚀 Step 2 — Start All Containers

Use the following command to **build (if needed)** and start all containers in detached mode.

```bash
docker compose up -d
```

**What happens:**
- Reads `.env` for environment variables (database configs, ports, etc.)
- Builds frontend and backend images if they don’t exist
- Starts both containers on the `demo-network`
- Nginx serves Angular build at `/demo`
- All `/backend/api/...` routes are proxied to the Spring Boot service

---

### 🔍 Step 3 — Verify Containers Are Running

Check if both containers are up and running successfully.

```bash
docker ps
```

**Expected Output:**
| CONTAINER ID | NAME | STATUS | PORTS |
|---------------|-------|--------|--------|
| xxxxxxxx | demo-frontend | Up | 0.0.0.0:4200->80/tcp |
| xxxxxxxx | demo-backend | Up | 0.0.0.0:8080->8080/tcp |

---

### 🧠 Step 4 — Testing

**Frontend (Angular)**  
Visit [http://localhost/demo](http://localhost/demo)

**Backend (Spring Boot API)**  
Test endpoints via browser or Postman:  
[http://localhost/backend/api/hello](http://localhost/backend/api/hello)

If everything is configured properly:
- The frontend loads successfully.
- API calls from the frontend reach the backend through the Nginx proxy.
- No CORS or network issues should appear in console logs.

---

### 🧹 Step 5 — Cleanup Containers & Networks

To **stop and remove** all containers and the custom network:

```bash
docker compose down
```

To remove unused images, volumes, and networks:

```bash
docker system prune -a
```

**⚠️ Warning:**  
`docker system prune -a` removes *all* unused images and containers, not just from this project.  
Use carefully in shared environments.

---

### ✅ Final Validation

| Check | Expected |
|-------|-----------|
| **Frontend container** | Accessible at `http://localhost/demo` |
| **Backend container** | Responds at `/backend/api/...` |
| **Logs** | No CORS or connection errors |
| **Network** | `demo-network` created and linked correctly |
| **Cleanup** | No dangling containers or images |

Once this phase passes, your full CI/CD + Docker setup is validated locally and ready for future expansion (e.g., GitHub integration or remote registry pushes).
