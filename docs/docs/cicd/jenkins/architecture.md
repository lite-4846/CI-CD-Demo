---
title: Architecture
sidebar_position: 2
---

The Jenkins setup for Any Project involves multiple coordinated components:

```plaintext
+---------------------+
|      Git Repos      |
|  (Frontend/Backend) |
+---------+-----------+
          |
          v
+---------------------+
|      Jenkins        |
|  - Jenkinsfiles     |
|  - Pipelines        |
|  - Credentials      |
+---------+-----------+
          |
          v
+---------------------+
|       Docker        |
| Builds service imgs |
+---------+-----------+
          |
          v
+---------------------+
|      AWS ECR        |
| Stores images/tags  |
+---------------------+
```

The pipeline stages are configured via Jenkinsfiles inside each project directory (frontend, backend, etc.).
