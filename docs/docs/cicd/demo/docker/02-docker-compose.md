---
title: Docker Compose
sidebar_position: 2
---

Now that both frontend and backend Docker images are built successfully through Jenkins, we’ll use **Docker Compose** to run them together locally.

This setup helps simulate how both containers interact (frontend → backend) in a production-like environment, but without external dependencies.

---

## 1. Prerequisites

Make sure:
- Docker Desktop is running
- Both Docker images (`demo-frontend` and `demo-backend`) exist locally  
  (You can verify using `docker images` command)

---

## 2. Create `docker-compose.yml`

```yaml
version: '3.9'  # Defines the Docker Compose file format version.

services:
  backend:
    image: demo-backend:latest   # The name and tag of the backend image to run. You can also use ImageId here (used in Prod)
    container_name: demo-backend  # A readable name for the backend container.
    
    build:                       # Optional build instructions (if Jenkins image not prebuilt).
      context: .                 # Context directory (root of the project).
      dockerfile: ./backend/Dockerfile.backend  # Path to Dockerfile for backend.
    
    ports:
      - "8080:8080"              # Maps host port 8080 to container port 8080 for external access.
    
    environment:                 # Environment variables for backend runtime.
      - SPRING_PROFILES_ACTIVE=prod
      - SERVER_PORT=8080
    
    networks:
      - demo-network             # Connects backend to shared Docker bridge network.

  frontend:
    image: demo-frontend:latest  # The name and tag of the frontend image to run.
    container_name: demo-frontend  # A readable name for the frontend container.
    
    build:                       # Optional build instructions (same logic as backend).
      context: .                 # Context directory (root of the project).
      dockerfile: ./angular/Dockerfile.frontend  # Path to Dockerfile for frontend.
    
    ports:
      - "4200:80"                # Maps host port 4200 to container port 80 (Nginx default).
    
    depends_on:
      - backend                  # Ensures backend container starts before frontend.
    
    networks:
      - demo-network             # Connects frontend to same private network.

networks:
  demo-network:
    driver: bridge               # Default driver creates an isolated virtual network.
```

---

## How It Works

1. **version: '3.9'**
   - Specifies the Compose file syntax version.  
     `3.9` works with Docker Engine v19.03+.

2. **services**
   - Defines the two containers we need — backend and frontend.
   - Each service can specify an image, ports, environment, and network.

3. **backend**
   - Runs the Spring Boot JAR using the image built from `Dockerfile.backend`.
   - Exposes port **8080** on host for direct API testing (optional).
   - Uses environment variables to activate `prod` profile and set server port.
   - Joins a shared Docker bridge network.

4. **frontend**
   - Runs an Nginx-based Angular build.
   - Serves the app from port **4200** (on host) → **80** (in container).
   - Depends on backend, ensuring startup order.
   - Connects to backend internally via the Docker network using the name `demo-backend`.

5. **networks**
   - Defines a private virtual network `demo-network`.
   - Both containers connect here, allowing them to talk using service names like:
     - `http://demo-backend:8080`
     - No need for `localhost` inside containers.

---

## Jenkins Context

Once Jenkins has built both images:
- `frontend-docker-image` → produces `demo-frontend:<build_id>`
- `backend-docker-image` → produces `demo-backend:<build_id>`

You can update the `image` tags in this file or use `latest` if Jenkins overwrites the tag every time.

Then simply run:

```bash
docker compose up -d
```

This starts both containers and runs the entire demo locally.

---

## Verification Steps

1. Visit **http://localhost:4200/demo** → Angular frontend via Nginx.
2. API calls automatically proxy to **http://demo-backend:8080/backend/api/** (inside Docker network).
3. Logs can be viewed using:
   ```bash
   docker compose logs -f
   ```
4. To stop containers:
   ```bash
   docker compose down
   ```

---

**Next:** We’ll explain the **Nginx configuration** (`default.conf`) that makes Angular routing and backend proxying work seamlessly.

