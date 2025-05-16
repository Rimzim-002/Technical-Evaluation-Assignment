import bcrypt from 'bcrypt';
import Student from '../models/studentModel.js'; 
import logger from '../utils/loggerManager.js';
import { dbconnection } from './dbConnection.js';

const seedAdmin = async () => {
  try {
    await dbconnection.authenticate();
    logger.info("DB Connected successfully.");

    const adminEmail = 'admin@gmail.com';

    // Check if admin already exists
    const existingAdmin = await Student.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      logger.info("Admin already exists, skipping seeding.");
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    await Student.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: '1', 
      isActive: true
    });

    logger.info("Admin enrolled successfully.");
  } catch (error) {
    logger.error("Error seeding admin:", error);
  }
};

export default seedAdmin