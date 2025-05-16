# Technical Evaluation Assignment

The purpose of this assignment is to evaluate the candidate’s proficiency in backend development using **Node.js**, **Express**, **MySQL**, and **Sequelize ORM**.

##  Course Management System

A backend API managing user authentication, course enrollment, and role-based access for students and admins.

---

##  Technology Stack

- Node.js  
- Express.js  
- MySQL  
- Sequelize ORM  
- JWT Authentication  
- Postman (for API testing)

---

## 📁 Project Structure

.
├── config/
├── controllers/
├── models/
├── routes/
├── seeders/
├── utils/
├── validations/
├── service/
├── middlewares/
├── .env
├── package.json
└── index.js
---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/course-management-system.git
cd course-management-system
2. Install Dependencies
     npm install
3. Configure .env

.env
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=coursemanagementsystem
  JWT_SECRET=your_jwt_secret
4. Set Up Database
npx sequelize-cli db:create
npx sequelize-cli db:migrate
 Creates a default admin user.
##  Start the Server
npm start
 Runs at: http://localhost:5000

## API Testing (Postman)
Includes:
Signup / Login
Course Creation
Enrollment
Fetch User Info
Admin & Student routes
**Default Admin Credentials**
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
 Author
Developed by Rimzim
