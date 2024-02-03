// src/features/notes/noteSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../core/entities/Note";
import { NoteRepository } from "../../adapters/repositories/NoteRepository"; // Adjust the import path as necessary

interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  currentNote: null,
  status: "idle",
  error: null,
};

// Async thunks
const noteRepository = new NoteRepository();

export const fetchNotes = createAsyncThunk<Note[] | null, string | undefined>(
  "notes/fetchNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const notes = await noteRepository.findByUserId(userId);
      if (!notes) {
        // Use rejectWithValue to handle rejections properly
        return rejectWithValue("Notes not found");
      }
      return notes; // Implicitly, the return type is Promise<Note[] | null>
    } catch (error) {
      return rejectWithValue("An error occurred");
    }
  }
);

export const fetchNoteById = createAsyncThunk<Note, string>(
  "notes/fetchNoteById",
  async (noteId: string, { rejectWithValue }) => {
    try {
      const note = await noteRepository.findById(noteId);
      if (!note) {
        return rejectWithValue("Note not found");
      }
      return note;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveNote = createAsyncThunk<Note, Note>(
  "notes/saveNote",
  async (note: Note) => {
    const savedNote = await noteRepository.create(note);
    return savedNote;
  }
);

export const updateNote = createAsyncThunk<Note, Note>(
  "notes/updateNote",
  async (note: Note) => {
    const updatedNote = await noteRepository.update(note._id, note);
    return updatedNote;
  }
);

export const deleteNote = createAsyncThunk<string, string>(
  "notes/deleteNote",
  async (noteId: string) => {
    await noteRepository.delete(noteId);
    return noteId;
  }
);

// Slice
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchNotes.fulfilled,
        (state, action: PayloadAction<Note[] | null>) => {
          state.status = "succeeded";
          if (action.payload !== null) {
            state.notes = action.payload;
          }
        }
      )
      .addCase(
        fetchNoteById.fulfilled,
        (state, action: PayloadAction<Note>) => {
          state.currentNote = action.payload;
        }
      )
      .addCase(saveNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      });
  },
});

export const { actions } = noteSlice;
export const { resetState } = noteSlice.actions;
export default noteSlice.reducer;
