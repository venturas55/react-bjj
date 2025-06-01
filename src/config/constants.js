export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://152.228.133.198:7001';
export const TOKEN_STORAGE_KEY = '@auth_token';
export const USER_STORAGE_KEY = '@user_data';

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  INVALID_CREDENTIALS: 'Invalid username or password',
  GENERAL_ERROR: 'An unexpected error occurred. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  PASSWORD_REQUIREMENTS: 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character',
};
