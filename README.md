# Online Learning Platform with ChatGPT Integration

An **online learning platform** built with the **MERN stack (MongoDB, Express, React, Node.js)**, featuring **user authentication, course management, student enrollment, and personalized course recommendations via GPT-3 API**. The application is fully deployable to cloud platforms and accessible via the Internet.  

---

## Table of Contents

- [Features](#features)    
- [Tech Stack](#tech-stack)  
- [RBAC & Protected Routes](#role-based-access-control-rbac--protected-routes)    

---

## Features

### Student Features

- Sign up and login with JWT authentication  
- View all available courses with details  
- Enroll in courses and see enrollment status  
- View list of enrolled courses  
- Receive personalized course recommendations from ChatGPT  

### Instructor Features

- Sign up and login with JWT authentication  
- Add, edit, and delete courses  
- View posted courses with details  
- View enrolled students for each course

### GPT-3 Integration
Students can enter prompts like:
```
"I want to be a software engineer, what courses should I follow?"

```
Backend calls the OpenAI GPT-3 API to generate personalized course recommendations.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** React.js, Vite, Tailwind CSS
- **Authentication:** JWT  
- **AI Integration:** OpenAI GPT-3 API  
- **Hosting / Deployment:** AWS

---

## Role-Based Access Control (RBAC) & Protected Routes

This application uses RBAC to distinguish between students and instructors. Certain actions are restricted by user role.



