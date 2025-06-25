# Student Management System - Node.js + MySQL

A simple web-based Student Management System built with **Node.js**, **Express**, **EJS**, and **MySQL**.

## 📦 Features

- Add new students
- View all students
- Search students by name
- Edit student details
- Delete student records
- Filter students by course (e.g., BCA, B.Tech)

## 🛠 Tech Stack

- Backend: Node.js, Express.js
- Templating Engine: EJS (with ejs-mate for layouts)
- Database: MySQL
- UUID for unique student IDs
- Method Override for supporting PATCH/DELETE

## 📁 Project Structure

student-management-node-mysql/
│
├── index.js # Main Express app
├── views/ # EJS templates (home.ejs, Student.ejs, Add.ejs, Edit.ejs, 404.ejs, etc.)
├── package.json
├── package-lock.json
└── Schema.sql # SQL schema to create the student table


## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-management-node-mysql.git
cd student-management-node-mysql

2. Install Dependencies
| Purpose                        | Package             | Why it’s needed                                                          |
| ------------------------------ | ------------------- | ------------------------------------------------------------------------ |
| Web-server framework           | **express**         | handles routing, middleware, listening on port 8080                      |
| Templating engine              | **ejs**             | lets you render dynamic HTML from `.ejs` files                           |
| Layout/partials helper for EJS | **ejs-mate**        | adds layout / `block` support; see `app.engine("ejs", ejsmate)` in code  |
| SQL driver                     | **mysql2**          | connects Node.js to your MySQL database                                  |
| HTTP method spoofing           | **method-override** | lets HTML forms simulate `PATCH` and `DELETE` requests                   |
| ID generator                   | **uuid**            | creates secure, unique student IDs (`uuidv4()`)                          |


3. Create MySQL Database
Open MySQL terminal or use a GUI (e.g., phpMyAdmin, MySQL Workbench).
Create a database:
CREATE DATABASE NODE_APP;
USE NODE_APP;

Run the schema from Schema.sql:
-- In MySQL console or Workbench
SOURCE /path-to-project/Schema.sql;

4. Configure MySQL Connection
Check the connection details in index.js:
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'NODE_APP',
    password: 'your-mysql-password'
});
🔒 Make sure to replace your-mysql-password with your actual password.

5. Start the Server
node index.js

Server will run on:
http://localhost:8080

🌐 Routes
| Method | URL                  | Description                 |
| ------ | -------------------- | --------------------------- |
| GET    | /home                | Home page                   |
| GET    | /Student             | List all students           |
| GET    | /Add                 | Add student form            |
| POST   | /Add                 | Create a new student        |
| PATCH  | /student/search      | Search student by name      |
| GET    | /student/\:id/edit   | Edit form for a student     |
| POST   | /edit/\:id           | Update student record       |
| DELETE | /Student/\:id/delete | Delete student record       |


📌 Notes
Uses method-override to simulate PATCH and DELETE via forms.

Uses uuid to generate unique student IDs.

Make sure views/ directory contains all required .ejs files.

