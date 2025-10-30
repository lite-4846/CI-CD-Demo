---
title: Cleanup & Maintenance
sidebar_position: 4
---


Over time, old images and containers can consume disk space.  
Regular cleanup ensures smooth deployments.

### Check Containers
```bash
docker ps -a
```

### Stop & Remove Containers
```bash
docker stop <container_id>
docker rm <container_id>
```

### Remove Unused Images
```bash
docker system prune -a
```

### Restart Services
If deployment fails:
```bash
docker-compose down
docker-compose up -d
```

### Verify Deployment
```bash
docker ps
```
Ensure all expected containers (frontend, backend, webform) are running with the latest image tags.
