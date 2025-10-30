---
title: .env Configuration  
sidebar_position: 3
---

Before running Docker Compose, we use an `.env` file to centralize all environment variables required by the Spring Boot backend container.  
This avoids hardcoding sensitive data like DB credentials directly in Dockerfiles or Compose files.  

The `.env` file must be present in the same folder where `docker-compose.yml` is located (`ci-cd-demo` in our case).  
You also need to **be inside this directory** when executing the compose command.

```bash
docker compose up -d
```

Below is the `.env` file used in our setup:

```bash
# Database Connection
SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/demo_db   # Points to local Postgres running on host machine
SPRING_DATASOURCE_USERNAME=postgres   # Username for Postgres
SPRING_DATASOURCE_PASSWORD=superman   # Password for Postgres

# JPA Configuration
SPRING_JPA_HIBERNATE_DDL_AUTO=update   # Updates schema automatically based on entities

# Server
SERVER_PORT=8181   # Application port inside container

```
---

### application.properties 

```text

# Database Configuration
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO}
spring.jpa.show-sql=true

# Server
server.port=${SERVER_PORT:8181}

# Actuator
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always

```