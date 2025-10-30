---
title: Images & Containers
sidebar_position: 2
---

### Building Images Locally
```bash
docker build -t iris-frontend:latest .
```

### Running Containers
```bash
docker run -d -p 8080:80 iris-frontend:latest
```

### Folder Structure (Typical)
Your Docker repo includes all image configuration files:
```plaintext
docker/
│
│── Dockerfile.frontend
│── start.sh
│
│── Dockerfile.backend
│── start-backend.sh
│
└─ my_site_ssl
```

Each Dockerfile defines how that service image is built.  
Scripts (.sh) handle container startup logic like setting environment variables or running jar files.
