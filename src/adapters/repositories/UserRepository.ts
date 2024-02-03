// src/adapters/repositories/UserRepository.ts
import { User } from '../../core/entities/User';
import { IUserRepository, UserCredentials, UserRegistration, AuthToken } from '../../core/interfaces/IUserRepository';
import httpClient from '../api/httpClient';

export class UserRepository implements IUserRepository {
  private authBaseURL = '/users';

  async login(credentials: UserCredentials): Promise<AuthToken> {
    const response = await httpClient.post(`${this.authBaseURL}/login`, credentials);   
    return response.data;
  }

  async signup(registrationDetails: UserRegistration): Promise<User> {
    const response = await httpClient.post(`${this.authBaseURL}/signup`, registrationDetails);
    return response.data;
  }
}
