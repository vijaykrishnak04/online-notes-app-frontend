import { Routes, Route } from 'react-router-dom';
import UserVerification from '../../validation/userVerification';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import Header from '../components/Header';

const NotesRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <UserVerification>
            <NoteList />
          </UserVerification>
        } />
        <Route path="/new" element={
          <UserVerification>
            <NoteForm />
          </UserVerification>
        } />
        <Route path="/edit/:noteId" element={
          <UserVerification>
            <NoteForm />
          </UserVerification>
        } />
      </Routes>
    </>
  )
}

export default NotesRoutes
