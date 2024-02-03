// src/core/interfaces/IUserRepository.ts
import { User } from '../entities/User';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  email: string;
}

export interface AuthToken {
  token: string;
  email: string;
  userId: string;
  username: string;
}

export interface IUserRepository {
  login(credentials: UserCredentials): Promise<AuthToken>;
  signup(registrationDetails: UserRegistration): Promise<User>;
}
