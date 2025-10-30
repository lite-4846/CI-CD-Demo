---
title: "Docker Setup"
sidebar_position: 1
---

This section guides you through setting up **Docker Desktop** for running containers locally.  
Docker will be used to containerize both the **frontend (Angular)** and **backend (Spring Boot)** applications.

---

### 1. Install Docker Desktop

#### Windows
- Download from: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- Run the installer and follow the setup wizard.
- After installation, ensure **Docker Desktop** is running (whale icon in system tray).

#### Linux (Ubuntu)
```
sudo apt update
sudo apt install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

### 2. Verify Docker Installation

Once installed, verify Docker is working:
```
docker --version
docker compose version
```

Then test Docker by running:
```
docker run hello-world
```

If you see a success message, Docker is installed correctly.

---

### 3. Enable Docker Compose

Docker Compose is already included with Docker Desktop (v2+).  
If not available, you can install it manually:

```
sudo apt install docker-compose
docker-compose --version
```

---

### 4. Configure Docker Permissions (Linux Only)

Add your user to the `docker` group to run Docker without `sudo`:
```
sudo usermod -aG docker $USER
newgrp docker
```

---

### 5. Pull a Test Image

This ensures you can connect to Docker Hub and pull images:
```
docker pull nginx
docker images
```

You should see an `nginx` image listed.

---

### 6. Troubleshooting Common Issues

| Problem | Cause | Solution |
|----------|--------|-----------|
| Docker Desktop not starting | WSL2 or Hyper-V disabled | Enable WSL2 and restart system |
| Permission denied | Missing user permissions | Run `sudo usermod -aG docker $USER` |
| “Build failed” during pipeline | Docker Daemon not running | Start Docker Desktop before running builds |

---

### 7. Next Steps

After Docker setup, you can:
- Run and test containers manually.
- Proceed to **Jenkins setup** to integrate Docker builds into pipelines.
