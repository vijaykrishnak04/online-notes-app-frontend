import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchNoteById, saveNote, updateNote } from '../../features/notes/noteSlice';
import { Editor } from '@tinymce/tinymce-react';

const NoteForm = () => {
  const { noteId } = useParams(); // Used for editing existing notes
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.users.user);

  const [isEditMode, setIsEditMode] = useState(() => noteId ? false : true);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Local state for the form
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const noteContentRef = useRef(note.content);


  const handleEditorChange = (content: string) => {
    noteContentRef.current = content;
  };


  const noteFromStore = useSelector((state: RootState) => state.notes.currentNote);

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

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const newNote = {
      _id: noteId,
      title: note.title,
      content: noteContentRef.current,
      user: user?._id
    }
    if (noteId) {
      // Dispatch update action
      dispatch(updateNote(newNote));
    } else {
      // Dispatch create action
      dispatch(saveNote(newNote));
    }

    navigate(`/notes/edit/${noteId}`); // Redirect to the notes list after saving
  };

  return (
    <div className="max-w-full mx-5 my-10 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-28">
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={note.title}
          onChange={handleChange}
          className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          readOnly={!isEditMode}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Content:
        </label>
        {isEditMode ? (
          <Editor
            initialValue={note.content}
            apiKey='383t5pppa3fmcjizcmu2skhfkfmwfwh1m67s3x6ggrhnk0iw'
            init={{
              plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ai_request: (_request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            onEditorChange={handleEditorChange}
          />
        ) : (
          <div
            className="prose dark:prose-dark max-w-none p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        )}
      </div>
      {isEditMode ? (
        <button
          onClick={() => {
            handleSubmit();
            toggleEditMode();
          }}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {noteId ? 'Save Changes' : 'Create Note'}
        </button>
      ) : (
        <button
          onClick={toggleEditMode}
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Edit Note
        </button>
      )}
    </div>
  );
};

export default NoteForm;
