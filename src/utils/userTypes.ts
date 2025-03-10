export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}
