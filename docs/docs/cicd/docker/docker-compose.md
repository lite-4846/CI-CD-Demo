---
title: docker-compose.yml
sidebar_position: 3
---

A **docker-compose.yml** file defines, configures, and orchestrates how multiple Docker containers run together as a single system. It allows you to declare containers, their relationships, environment variables, ports, volumes, and networks — all in one declarative YAML file.  
This eliminates the need to manually run long `docker run` commands and ensures consistent multi-container deployments across environments.

### Key Capabilities of docker-compose.yml
- **Multi-container coordination:** Define and run several containers (backend, frontend, database, etc.) as a unified application.  
- **Dependency management:** Control container startup order with `depends_on`.  
- **Environment configuration:** Inject runtime settings using `environment` blocks or `.env` files.  
- **Build automation:** Automatically build images from specified Dockerfiles when needed.  
- **Port mapping:** Expose specific ports for communication between containers or external clients.  
- **Networking:** Connect containers via isolated virtual networks using the `networks` section.  
- **Volume management:** Persist or share data across container restarts.  
- **Scalability:** Scale services horizontally with commands like `docker-compose up --scale service=n`.  
- **Ease of deployment:** Start, stop, and update complete environments with a few commands.

### Example docker-compose.yml
```yaml
version: '3.9'  # Defines the Compose file format version. Newer versions support more features.

services:
  backend:
    image: demo-backend:latest        # Specifies which Docker image to use for the backend service.
    container_name: demo-backend      # Assigns a readable name to the backend container.
    
    build:                            # Optional build instructions if the image isn’t prebuilt.
      context: .                      # Directory where Docker will look for the Dockerfile and related files.
      dockerfile: ./backend/Dockerfile.backend  # Explicit Dockerfile path for backend.
    
    ports:
      - "8080:8080"                   # Maps host port 8080 to container port 8080.
    
    environment:                      # Runtime environment variables for the container.
      - SPRING_PROFILES_ACTIVE=prod
      - SERVER_PORT=8080
    
    networks:
      - demo-network                  # Connects the backend container to the defined network.

  frontend:
    image: demo-frontend:latest       # Specifies the image for the frontend container.
    container_name: demo-frontend     # Assigns a readable name to the frontend container.
    
    build:
      context: .                      # Uses the project root as build context.
      dockerfile: ./angular/Dockerfile.frontend  # Path to the frontend Dockerfile.
    
    ports:
      - "4200:80"                     # Maps host port 4200 to container port 80 (used by Nginx).
    
    depends_on:
      - backend                       # Ensures backend starts before frontend.
    
    networks:
      - demo-network                  # Joins the same private network as the backend.

networks:
  demo-network:
    driver: bridge                    # Creates an isolated bridge network for inter-container communication.
```

### How Deployment Typically Works
1. **CI/CD builds and pushes images** — Jenkins (or another CI tool) builds and pushes updated images to ECR or Docker Hub.  
2. **Ops team updates image tags** — They edit the `image` tags in this file to point to the new version.  
3. **Pull and restart services:**  
   ```bash
   docker-compose pull
   docker-compose up -d
   ```  
   This pulls the latest images and recreates containers in detached mode.  
4. **Containers reload with new versions**, automatically connecting to the same networks and preserving data volumes if configured.

### Summary
`docker-compose.yml` is the central configuration file for defining, running, and maintaining containerized applications in a predictable and repeatable way. It simplifies deployment, improves consistency across environments, and makes complex multi-service systems manageable with a few declarative lines.
