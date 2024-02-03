// src/frameworks/components/NoteList.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotes } from '../../features/notes/noteSlice'; 
import { AppDispatch, RootState } from '../../app/store';

const NoteList = () => {
  const dispatch: AppDispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes); 
  const status = useSelector((state: RootState) => state.notes.status); 
  const error = useSelector((state: RootState) => state.notes.error); 
  const user = useSelector((state: RootState) => state.users.user); 


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotes(user?._id));
    }
  }, [status, dispatch, user?._id]);

  return (
    <div>
      <h1>Notes</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' && notes.map(note => (
        <div key={note._id}>
          <h2>{note.title}</h2>
          {/* Link to edit the note */}
          <Link to={`/notes/edit/${note._id}`}>Edit</Link>
        </div>
      ))}
      {status === 'failed' && <div>Error: {error}</div>}
      {/* Link to create a new note */}
      <Link to="/notes/new">Create Note</Link>
    </div>
  );
};

export default NoteList;
