Course Management System API
This is a secure RESTful API for managing courses and student enrollments. Built with Node.js, Express.js, MySQL, and Sequelize, it supports user authentication, role-based access control, course creation, and student enrollment.
Features
Admins can create and manage multiple courses.

Students can register, login, and enroll in available courses.

JWT-based authentication.

Role-based access control (Admin & Student).

View all courses with enrollment status.

View single course details along with enrolled students.

Sequelize ORM for models, relationships, migrations, and seeders.

Centralized error handling and request validation.

Default Admin created via seeder.

Tech Stack
Node.js

Express.js

MySQL

Sequelize

JWT for authentication

Yup or express-validator for input validation (choose based on your project)

dotenv for environment configuration



📁 Project Structure

.
├── config/
│   └── config.js         # Sequelize DB config
├── controllers/
├── middlewares/
├── models/
├── routes/
├── seeders/
├── services/
├── utils/
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
Roles & Permissions
Role	Permissions
Admin	Create/view courses, view enrolled students
Student	Register, view courses, enroll in courses

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/course-management-system.git
cd course-management-system
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root directory
4. Setup Environment Variables
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=course_management
JWT_SECRET=your_jwt_secret

4. Set Up the Database
Make sure MySQL is running. Then execute:
npx sequelize-cli db:create
npx sequelize-cli db:migrate
 Seeders file  will create a default admin user.

5. Start the Server
npm  run start
🌐 The server will run at: http://localhost:5000

6.📬 API Testing (Postman)
✅ Includes:
Signup / Login
Course Creation
Enrollment
Fetch User Info
Admin & Student routes

 Default Admin Credentials
{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
Author
Developed by Rimzim

