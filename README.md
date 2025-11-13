# 🎓 SLIMS — Smart Learning and Information Management System

## 📘 Project Overview  
The **Smart Learning and Information Management System (SLIMS)** is a full-stack web application designed to streamline academic and administrative processes between **Students**, **Teachers**, and **Admins**.  
It provides a centralized dashboard for managing users, tracking performance, handling complaints, and managing courses efficiently.

The project’s goal is to create a **role-based**, **data-driven**, and **secure** environment that enhances collaboration and simplifies management tasks.

Access the Actual Project at: https://ses-project-1.onrender.com 
---

## 🏗️ Project Structure  

The application follows a **modular MVC architecture**, integrating both **frontend** and **backend** components for smooth operation.

### 🔹 Main Modules
- **Admin Module** – Oversees users, monitors reports, and manages system operations.  
- **Teacher Module** – Handles academic performance, student management, and complaints.  
- **Student Module** – Enables students to access academic progress, submit complaints, and track updates.

---

## 🏛️ System Design and Architecture  

SLIMS is built using:
- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  

### 🧠 Design Patterns Used
1. **Factory Method** – Used in models and controllers to standardize object creation with Mongoose schemas.  
2. **Controller Pattern** – Each route is handled by a dedicated controller to maintain modularity.  
3. **Mediator Pattern** – Coordinates communication between Admin, Teacher, and Student modules, ensuring **loose coupling**, **uniform UI behavior**, and **smoother updates**.

---

## ⚙️ Installation and Deployment Guide  

### 1️⃣ Prerequisites  
- Node.js (v18 or higher)  
- MongoDB  
- npm package manager  

### 2️⃣ Install dependencies  
Run dependency installation in both backend and frontend directories.

### 3️⃣ Setup environment variables  
Create a `.env` file in the root directory and add:
MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SECRET=your_secret_key

### 4️⃣ Run the backend server  
Run the backend development server to handle APIs and logic.

### 5️⃣ Start the frontend  
Navigate to the client folder and start the React app.

### 6️⃣ Open the application  
Visit your local deployment at: http://localhost:3000

---

## 👩‍💼 Application Workflows  

### 🧑‍💻 Admin Workflow  
- Log in with admin credentials.  
- Access dashboard showing system and user statistics.  
- Manage Teachers and Students (add/edit/remove).  
- View and resolve complaints and performance reports.  
- Monitor module operations and maintain synchronization.

### 👨‍🏫 Teacher Workflow  
- Log in to the teacher dashboard.  
- Manage assigned students and track academic data.  
- Update grades and feedback.  
- View complaints and submit responses or escalate to Admin.  
- Monitor performance and progress reports.

### 👩‍🎓 Student Workflow  
- Log in using student credentials.  
- Access personal dashboard with grades and activity logs.  
- Submit complaints and feedback.  
- Track complaint status and view responses.  
- Interact with teachers through the portal.

---

## 🔁 Continuous Integration (CI/CD) with CircleCI  

A custom **CircleCI pipeline** automates testing and deployment.  
It includes the following jobs:
- ✅ Code linting for consistent formatting  
- 🧪 Backend testing for route and model validation  
- ⚛️ Frontend build verification to ensure UI compilation  

Environment variables like MongoDB URI and JWT secret are securely managed within CircleCI project settings.  
This pipeline ensures **stable builds**, **early error detection**, and **smooth deployments**.

---

## 🚀 Project Status and Outcome  

All **planned epics and stories** were completed successfully within the defined sprints.  
Each feature was tested thoroughly, with the system showing strong:
- Maintainability  
- Scalability  
- Usability  

SLIMS demonstrates the practical use of design patterns, modular structure, and efficient role-based control — serving as a model academic management platform.

---

## 👥 Authors and Contributors  

Developed collaboratively by the **SLIMS Development Team**.  
Each member contributed to **frontend**, **backend**, **testing**, and **CI/CD integration**, following Agile and sprint-based methodologies.

---

## 📄 License  
This project was developed for **academic and demonstration purposes**.  
All rights reserved © SLIMS Team.

---



