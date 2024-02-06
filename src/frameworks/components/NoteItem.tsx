// src/frameworks/components/NoteItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../../core/entities/Note'; // Adjust the import path as necessary
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { deleteNote } from '../../features/notes/noteSlice';
import { TrashIcon } from '@heroicons/react/16/solid';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (noteId: string | undefined) => {
    if (noteId) {
      dispatch(deleteNote(noteId))
    }
  }

  return (
    <div className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold dark:text-gray-300">{note.title}</h2>
      {/* Link to view/edit the note */}
      <div className="flex justify-end mt-2">
        <Link to={`/notes/edit/${note._id}`} className="text-blue-500 dark:text-blue-300 hover:underline">
          Open
        </Link>
        {/* Delete button */}
        <button
          className="text-red-500 dark:text-red-300 hover:underline ml-4"
          onClick={() => handleDelete(note._id)}
        >
          <TrashIcon className="w-5 h-5 inline-block align-middle" /> Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
