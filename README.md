# 🚀 CI/CD Training Demo

This repository contains a **complete hands-on demo for learning CI/CD** concepts using **Jenkins, Docker, and AWS**. 
It is designed for developers who want to understand how modern build, test, and deployment pipelines work in real-world setups.

---

## 📘 Documentation

All learning materials and step-by-step guides are available inside the **`/docs`** folder, powered by **Docusaurus**. 
You’ll find detailed explanations, visuals, and practical exercises to master CI/CD fundamentals.

---

## 🧭 Quick Start for Beginners

Follow these steps to set up the project and view the documentation locally.

### Prerequisites

* You must have **Git** installed on your system.
* You must have **Node.js** and **npm** installed on your system.
* You must have **Visual Studio Code (VS Code)** installed. If you don't have it, download it from here - [VS Code](https://code.visualstudio.com/download).

---

### Step 1: Set Up the Project Folder and Clone the Repository

1.  **Create the main project folder** on your **D: drive**.
    * Open your **File Explorer**.
    * Go to the **D: drive**.
    * Create a new folder named `iris-code`.

2.  **Open your terminal** (e.g., Command Prompt, PowerShell, or Git Bash) and navigate to the newly created folder.
    ```bash
    D:
    cd D:\iris-code
    ```

3.  **Clone the repository** into the `iris-code` folder. This will create a new folder named `CI-CD-Demo` inside `iris-code`.
    ```bash
    git clone [https://github.com/lite-4846/CI-CD-Demo.git](https://github.com/lite-4846/CI-CD-Demo.git)
    ```

### Step 2: Open the Project in VS Code

1.  **Navigate** into the cloned repository folder.
    ```bash
    cd ci-cd-demo
    ```

2.  **Open the project** folder in **Visual Studio Code**. The `code .` command opens the current directory in VS Code.
    ```bash
    code .
    ```
    

### Step 3: Run the Documentation Locally

1.  In **Visual Studio Code**, open the **Integrated Terminal** (**Terminal > New Terminal**). The terminal should automatically open in the project's root directory: `/d/iris-code/ci-cd-demo`.

2.  **Navigate** to the **`docs`** folder within the terminal.
    ```bash
    cd docs
    ```

3.  **Install dependencies** required for the documentation website. This might take a minute.
    ```bash
    npm install
    ```

4.  **Run the local server**.
    ```bash
    npm run start
    ```

5.  Open your web browser and go to:
    👉 **`http://localhost:3000`**

---

## 🧩 What You’ll Learn

- CI/CD fundamentals and best practices  
- Jenkins pipeline setup  
- Docker-based builds and deployments  
- AWS integration for production-ready workflows  

---

## 🛠️ Tech Stack

- **Frontend Docs:** Docusaurus 3  
- **CI/CD Tools:** Jenkins, Docker  
- **Cloud:** AWS (EC2, ECR)  
- **Language:** Shell + Groovy + YAML  

---

## 📂 Structure

| Folder | Description |
|---------|--------------|
| `/docs` | Documentation website (Docusaurus) |
| `/jenkins` | Sample Jenkinsfiles and scripts |
| `/docker` | Dockerfiles and container configs |
| `/sample-app` | Basic demo app used in pipelines |

---

## 💡 Next Steps

Once your Docusaurus docs are running, follow the chapters in order from:
👉 `docs/cicd/intro` → `docs/cicd/docker/intro` → `docs/cicd/jenkins/intro`

Each section contains practical demos and explanations to help you implement your own CI/CD setup.

---

## 🧑‍💻 Contributing

Feel free to:
- Fix typos or broken links in docs  
- Add new examples or scripts  
- Suggest improvements via PRs  

---

## ⚡ Credits

Maintained as part of the **DevOps Training Program**.  
For full training material, refer to the Docusaurus documentation inside `/docs`.
