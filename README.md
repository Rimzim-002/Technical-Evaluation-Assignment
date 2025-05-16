📘 Course Management System API
A secure RESTful API for managing courses and student enrollments. Built with Node.js, Express.js, MySQL, and Sequelize, it supports:

User authentication

Role-based access control

Course creation

Student enrollment

🚀 Features
🛠 Admins

Create and manage multiple courses

View all courses and enrolled students

👩‍🎓 Students

Register and log in

Enroll in available courses

🔐 Authentication

JWT-based authentication

Role-based access control (Admin & Student)

📚 Course Management

View all courses with enrollment status

View single course with enrolled students

🧩 Development Tools

Sequelize ORM for models, relationships, migrations, and seeders

Centralized error handling

Centralized request validation

Default Admin created via seeders

🧰 Tech Stack
Node.js

Express.js

MySQL

Sequelize

JWT (Authentication)

Joi or express-validator (Input validation)

dotenv (Environment configuration)

📁 Project Structure
bash
Copy
Edit
.
├── config/             # DB Configuration
│   └── config.js
├── controllers/        # Route handlers
├── middlewares/        # Auth, error handlers, etc.
├── models/             # Sequelize models
├── routes/             # Express routes
├── seeders/            # Default data population
├── services/           # Business logic
├── utils/              # Utility functions
├── .env                # Environment variables
├── .gitignore
├── package.json
├── README.md
└── index.js           # Application entry point
👤 Roles & Permissions
Role	Permissions
Admin	Create/view courses, view enrolled students
Student	Register, view courses, enroll in courses

⚙️ Setup Instructions
1. 📦 Clone the Repository
git clone https://github.com/your-username/course-management-system.git
cd course-management-system
2. 🧱 Install Dependencies
npm install
3. 🔐 Configure Environment Variables
Create a .env file in the root directory:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=course_management
JWT_SECRET=your_jwt_secret
4. 🛠 Set Up the Database
Ensure MySQL is running, then run:
npx sequelize-cli db:create
npx sequelize-cli db:migrate
✅ The seeders will create a default admin user.

5. 🚀 Start the Server
npm run start
🌐 Visit: http://localhost:5000

6. 🧪 API Testing (Using Postman)
Includes testing for:

✅ Signup / Login

✅ Course Creation

✅ Enrollment

✅ Fetch User Info

✅ Admin & Student route access

🧑‍💼 Default Admin Credentials

{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
👨‍💻 Author
Developed by Rimzim

