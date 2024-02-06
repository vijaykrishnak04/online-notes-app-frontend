// src/frameworks/components/NoteList.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotes } from '../../features/notes/noteSlice';
import { AppDispatch, RootState } from '../../app/store';
import NoteItem from './NoteItem'; // Import the NoteItem component

const NoteList = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const status = useSelector((state: RootState) => state.notes.status);
  const error = useSelector((state: RootState) => state.notes.error);
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    if (status === 'idle' && user) {
      dispatch(fetchNotes(user._id));
    }
  }, [status, dispatch, user]);

  return (
    <div className="container mx-auto my-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mt-28">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Notes</h1>
      {/* Responsive grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notes.map(note => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
      {status === 'failed' && <div>Error: {error}</div>}
      <div className="mt-4">
        <Link to="/notes/new" className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
          Create Note
        </Link>
      </div>
    </div>

  );
};

export default NoteList;
