const Messages = {
  USER: {
    LOGIN_SUCCESS: "Logged in successfully",
    LOGIN_FAILED: "Login failed! Invalid credentials",
    SIGNUP_SUCCESS: "User registered successfully",
    SIGNUP_FAILED: "User registration failed",
    EMAIL_EXISTS: "Email already in use",
    EMAIL_NOT_EXISTS: "Email not exist",
    INVALID_EMAIL: "Invalid email format",
    PASSWORD_REQUIRED: "Password is required",
    USER_NOT_EXIST: " User not exist",
    USER_EXIST: "User Already Exist",
    USER_DELETE_SUCESSFULLY: "User delete Successfully",
    USER_DELETE_FAILED: "User deletition failed",

    USER_FOUND: " User",
    USER_UPDATED: " User Updated sucessfully",
    USER_UPDATED_FAILED: " User Updated failed",

    CREATED_SUCESSFULLY: " Created Successfully",
    CREATED_FAILED: " Created Failed",
    INVALID_CREDENTIALS: "Invalid credentials",
  },
  COURSE: {
    COURSE_SUCCESS: "course created successfully",
    COURSE_FAILED: "course created failed",
    COURSE_FETCH_FAILED: " Fetch Failed",
    COURSE_FETCH_SUCCESS: " Fetch success",
    COURSE_EXISTS: "course already in use",
    COURSE_NOT_EXISTS: "course not exist",

    COURSE_DELETE_SUCESSFULLY: "course delete Successfully",
    COURSE_DELETE_FAILED: "course deletition failed",
    COURSE_NOT_FOUND: "course not found",
    COURSE_FOUND: " course",
    COURSE_UPDATED: " curse Updated sucessfully",
    COURSE_UPDATED_FAILED: " course Updated failed",
    COURSE_ENROLL_FAILED: "course enrollment failed",
    COURSE_ENROLL_SUCCESS: "course enrollment successful",
  },
  ENROLLMENT: {
    ENROLLMENT_SUCCESS: "Enrollment successful",
    ENROLLMENT_FAILED: "Enrollment failed",
    ALREADY_ENROLLED: "Already enrolled in this course",
    ENROLLMENT_NOT_FOUND: "Enrollment not found",
  },
  AUTH: {
    TOKEN_MISSING: "Authorization token is missing",
    TOKEN_INVALID: "Invalid or expired token",
    ACCESS_DENIED: "Access denied! Unauthorized user",
  },

  VALIDATION: {
    REQUIRED_FIELDS: "Please fill in all required fields",
    INVALID_INPUT: "Invalid input data",
  },
  SYSTEM: {
    SERVER_ERROR: "An unexpected error occurred. Please try again later",
  },
};
export default Messages;
