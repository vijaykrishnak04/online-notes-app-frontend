import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchNoteById, saveNote, updateNote } from '../../features/notes/noteSlice';

const NoteForm = () => {
  const { noteId } = useParams(); // Used for editing existing notes
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.users.user); 


  // Local state for the form
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const noteFromStore = useSelector((state: RootState) => state.notes.currentNote); // Adjust the path as necessary

  // Effect to fetch note details for editing
  useEffect(() => {
    if (noteId) {
      dispatch(fetchNoteById(noteId));
    }
  }, [noteId, dispatch]);

  // Effect to fill form when note is fetched from the store
  useEffect(() => {
    if (noteFromStore && noteId) {
      setNote({
        title: noteFromStore.title,
        content: noteFromStore.content
      });
    }
  }, [noteFromStore, noteId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote = {
      _id: noteId,
      title: note.title,
      content: note.content,
      user: user?._id
    }
    if (noteId) {
      // Dispatch update action
      dispatch(updateNote(newNote));
    } else {
      // Dispatch create action
      dispatch(saveNote(newNote));
    }

    navigate('/'); // Redirect to the notes list after saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={note.title} onChange={handleChange} />
      </label>
      <label>
        Content:
        <textarea name="content" value={note.content} onChange={handleChange} />
      </label>
      <button type="submit">{noteId ? 'Update Note' : 'Create Note'}</button>
    </form>
  );
};

export default NoteForm;
