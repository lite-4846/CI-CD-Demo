---
title: Nginx Configuration  
sidebar_position: 7
---

The Nginx configuration (`default.conf`) acts as a **reverse proxy and static file server**.  
It serves the **Angular frontend** and proxies all **API calls** to the backend container.

This file is placed in your **Angular directory** and copied into the Nginx container by the Dockerfile during build.

---

### 📁 File Path
```bash
ci-cd-demo/angular/default.conf
```

---

### 🧩 Full Configuration with Explanations

```nginx
server {
    listen 80;                      # The Nginx container listens on port 80
    server_name _;                  # Accepts requests from any hostname

    # Redirect root to /demo
    location = / {
        return 301 /demo;           # Redirects base path (/) to /demo route
    }

    # ================================
    # FRONTEND (Angular under /demo)
    # ================================
    location /demo {
        alias /demo/angular/dist/demo/browser;  # Points to Angular’s build output
        index index.html;                       # Default file when directory is accessed
        try_files $uri $uri/ /demo/index.html;  # Ensures Angular handles client-side routing
    }

    # ================================
    # BACKEND (API proxy)
    # ================================
    location /backend/api/ {
        proxy_pass http://demo-backend:8181/;   # Forwards API requests to backend container
        proxy_http_version 1.1;                 # Ensures persistent HTTP/1.1 connections
        proxy_set_header Upgrade $http_upgrade; # WebSocket/HTTP upgrade support
        proxy_set_header Connection 'upgrade';  # Keeps connection upgrade open
        proxy_set_header Host $host;            # Forwards original host header
        proxy_cache_bypass $http_upgrade;       # Disables caching for upgraded connections

        # Allow cross-origin requests (CORS)
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
        add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept, Authorization';
    }
}
```

---

### ⚙️ Summary

| Section | Purpose |
|----------|----------|
| **listen / server_name** | Defines the port and domain Nginx responds to. |
| **location /** | Redirects root traffic to `/demo`. |
| **location /demo** | Serves Angular static files and handles SPA routing. |
| **location /backend/api/** | Proxies backend API calls to the Spring Boot container and manages CORS. |

---

Once this config is built into the frontend Docker image, it ensures your app runs smoothly at:

**Frontend:** `http://localhost/demo`  
**Backend (proxied):** `http://localhost/backend/api/...`
