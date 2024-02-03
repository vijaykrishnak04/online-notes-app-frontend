// src/adapters/repositories/NoteRepository.ts
import { Note } from '../../core/entities/Note';
import { INoteRepository } from '../../core/interfaces/INoteRepository';
import httpClient from '../api/httpClient'; 
import axios from 'axios';

export class NoteRepository implements INoteRepository {
  private baseURL = 'notes'; 

  async create(note: Note): Promise<Note> {
    const response = await httpClient.post(this.baseURL, note);
    return response.data;
  }

  async findById(id: string): Promise<Note | null> {
    try {
      const response = await httpClient.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async findByUserId(userId: string | undefined): Promise<Note[]> {
    const response = await httpClient.get(`user-${this.baseURL}/${userId}`);
    return response.data;
  }

  async update(id: string | undefined, note: Note): Promise<Note> {
    const response = await httpClient.put(`${this.baseURL}/${id}`, note);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await httpClient.delete(`${this.baseURL}/${id}`);
  }
}
