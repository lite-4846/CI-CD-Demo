---
title: docker-compose.yml
sidebar_position: 3
---

docker-compose.yml defines how multiple containers run together.  
IRIS-Instant uses one central compose file to start frontend, backend, and webform containers.

### Example Snippet
```yaml
version: "3.3"
services:
  backend:
    image: 2e4a4e491cb8
    container_name: backend
    restart: unless-stopped
    environment:
      - IRIS_DIGI_SIGN_BASE_URL=http://localhost:8085
      - EMUDHRA_API_HOST=http://43.204.248.220
      - HEALTH_CHECK_URL=${HEALTH_CHECK_URL}
      - taskManagement.excelLocking.showOriginalExcelFile=false  
    extra_hosts:
      - "iris-host:host-gateway"
    ports:
      - 8081:8081
      - 8888:8888
      - 8090:8090
      - 8091:8091
    healthcheck:
        test: ["CMD", "sh", "-c", "curl -f $HEALTH_CHECK_URL || exit 1"] 
        interval: 60s
        timeout: 60s
        retries: 200
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /ifiledev-mount:/iFile-Files
      - ~/.aws:/root/.aws
    networks:
      - my_network
  frontend:
    image: 374d18b52064
    container_name: frontend
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /ifiledev-mount:/iFile-Files
      - /etc/ssl/2025-2026/irisinstantqa.irisbusiness.com/star.irisbusiness.com.crt:/etc/nginx/ssl/star.irisbusiness.com.crt
      - /etc/ssl/2025-2026/irisinstantqa.irisbusiness.com/star.irisbusiness.com.key:/etc/nginx/ssl/star.irisbusiness.com.key
    networks:
      - my_network
    environment:
      - TZ=Asia/Kuala_Lumpur
      - COMMON_OAUTH_LOGIN=${COMMON_OAUTH_LOGIN}
      - COMMON_CAPTCHA_MODE=${COMMON_CAPTCHA_MODE}
  webform:
    image: 14ec080f6a89
    container_name: webform
    restart: unless-stopped
    ports:
      - 8086:8086
    environment:
      - TZ=Asia/Kuala_Lumpur    
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /ifiledev-mount:/iFile-Files
    networks:
      - my_network
networks:
  my_network:
    driver: bridge

```

### How Deployment Works
1. Jenkins builds and pushes new images to ECR.  
2. The server team updates the image tag in this file.  
3. Run:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```
4. The containers restart with new versions.
