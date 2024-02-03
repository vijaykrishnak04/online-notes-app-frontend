// src/core/useCases/CreateNote.ts
import { Note } from '../entities/Note';
import { INoteRepository } from '../interfaces/INoteRepository';

export class CreateNote {
  constructor(private noteRepository: INoteRepository) {}

  async execute(note: Note): Promise<Note> {
    // Business rules can be applied here
    return await this.noteRepository.create(note);
  }
}
