const Messages = {
  USER: {
    LOGIN_SUCCESS: 'Logged in successfully',
    LOGIN_FAILED: 'Login failed! Invalid credentials',
    SIGNUP_SUCCESS: 'User registered successfully',
    SIGNUP_FAILED: 'User registration failed',
    EMAIL_EXISTS: 'Email already in use',
    EMAIL_NOT_EXISTS: 'Email not exist',
    INVALID_EMAIL: 'Invalid email format',
    PASSWORD_REQUIRED: 'Password is required',
    USER_NOT_EXIST: ' User not exist',
    USER_EXIST: 'User Already Exist',
    USER_UPDATED: ' User Updated sucessfully',
    CREATED_SUCESSFULLY: ' Created Successfully',
    CREATED_FAILED: ' Created Failed',
    INVALID_CREDENTIALS: 'Invalid credentials',

  },
  AUTH: {
    TOKEN_MISSING: 'Authorization token is missing',
    TOKEN_INVALID: 'Invalid or expired token',
    ACCESS_DENIED: 'Access denied! Unauthorized user',
  },
  
  VALIDATION: {
    REQUIRED_FIELDS: 'Please fill in all required fields',
    INVALID_INPUT: 'Invalid input data',
  },
  SYSTEM: {
    SERVER_ERROR: 'An unexpected error occurred. Please try again later',
  },
};
export default Messages;
