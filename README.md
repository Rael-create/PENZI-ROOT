# Penzi SMS Matching System

## Project Overview

Penzi is a full-stack SMS based matchmaking platform that allows users to register, send messages, and find matches based on profile preferences.

The system consists of:

* **Frontend:** React (Vite)
* **Backend:** Flask API
* **Database:** MySQL
* **Containerization:** Docker & Docker Compose

The entire application runs using containers for easy development and deployment.

---

# System Architecture

Frontend (React) → Backend API (Flask) → MySQL Database

Docker containers manage the communication between these services.

---

# Project Structure

```
penzi-root
│
├── penzi-frontend/       # React frontend
│   └── Dockerfile
│
├── smspenzi/             # Flask backend
│   └── Dockerfile
│
├── docker-compose.yml    # Orchestrates frontend, backend, and database
├── .env                  # Environment variables (not pushed to GitHub)
└── .gitignore
```

---

# Technologies Used

Frontend

* React
* Vite
* Axios

Backend

* Flask
* Flask SQLAlchemy
* PyMySQL

Database

* MySQL

DevOps

* Docker
* Docker Compose
* Git & GitHub


# Accessing the Application

Frontend:

```
http://localhost:5173
```

Backend API:

```
http://localhost:5000
```

MySQL Database:

```
localhost:3306
```

# Docker Services

The project runs three containers:

1. **Database**

   * MySQL container storing user and message data.

2. **Backend**

   * Flask API handling SMS logic and database operations.

3. **Frontend**

   * React interface communicating with the backend API.

---

# Deployment

This application can be deployed to a Linux production server using Docker.

Typical deployment flow:

```
git clone repository
docker compose up -d --build
```

---

# Author

Rael Wamaya Achieng

