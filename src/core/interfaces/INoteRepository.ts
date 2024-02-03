// src/core/interfaces/INoteRepository.ts
import { Note } from '../entities/Note';

export interface INoteRepository {
  create(note: Note): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  findByUserId(userId: string): Promise<Note[]>;
  update(id: string, note: Note): Promise<Note>;
  delete(id: string): Promise<void>;
}
