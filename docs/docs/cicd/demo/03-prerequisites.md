---
title: "Prerequisites"
sidebar_position: 3
---

Before you start the demo, ensure that your local system is properly set up with the required tools.  
These are the **minimum prerequisites** to successfully build, run, and test the entire CI/CD pipeline.

---

### 1. Operating System
- **Windows 10/11** (Preferred for demo)  
  or  
- **Linux (Ubuntu 22.04+)** / **macOS**  
  Jenkins setup and Docker commands are mostly platform-independent.

---

### 2. Installed Tools

| Tool | Version (Recommended) | Purpose |
|------|------------------------|----------|
| **Java JDK** | 17+ | Required for running Jenkins and building the Spring Boot backend |
| **Maven** | 3.9+ | Used to build the Spring Boot JAR |
| **Git** | Latest | Cloning repo, managing code |
| **Node.js** | 20+ | Building Angular frontend |
| **npm / pnpm** | Latest | Package manager for frontend dependencies |
| **Docker Desktop** | Latest | To build and run containers locally |
| **Jenkins** | 2.462+ | CI/CD automation tool used for the demo |

---

### 3. Verify Installation

You can verify each tool using these commands in your terminal:

```
java -version
mvn -version
git --version
node -v
npm -v
docker --version
```

---

### 4. Jenkins Installation

For detailed step-by-step installation on **Windows**,  
see the **Jenkins Installation Guide** inside the demo section:

**[Setup → Jenkins → Installing Jenkins](./setup/02-jenkins-setup.md)**

---

### 5. Clone or Obtain Demo Project

You can either:
1. **Clone the repository** from your version control system (if available)
   ```bash
   git clone https://github.com/lite-4846/CI-CD-Demo.git
   ```
2. Or, **Download and extract** the ZIP provided by the project maintainer.  
   The extracted folder will contain both the `angular/` and `backend/` applications, along with Docker and Jenkins files.

---

### 6. Optional Tools (For Better Experience)
- **Visual Studio Code** – for editing Angular/Backend code.  
- **Postman / REST Client (VSCode plugin)** – to test backend endpoints.  
- **Docker Desktop Dashboard** – to visually inspect running containers.

---

### 7. System Requirements
- **RAM:** Minimum 8 GB (Jenkins + Docker together can consume significant memory)
- **Storage:** At least 10 GB free disk space for images, containers, and artifacts
- **Internet:** Required for initial package downloads (Node, Maven, Docker base images)

---

### Summary
By completing these installations, you ensure your environment is ready for:
- Building the frontend and backend
- Running Docker containers
- Executing Jenkins pipelines end-to-end  

If any tool is missing, install it now — skipping this step will cause Jenkins jobs or Docker builds to fail later.
