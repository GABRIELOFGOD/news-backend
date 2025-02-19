import validator from 'validator';

export const emailValidator = (email: string): boolean => {
  const isValid = validator.isEmail(email);
  return isValid;
}