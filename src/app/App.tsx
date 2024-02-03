// src/app/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteList from '../frameworks/components/NoteList';
import NoteForm from '../frameworks/components/NoteForm';
import Login from '../frameworks/components/Login';
import Register from '../frameworks/components/Register';
import Header from '../frameworks/components/Header';
import UserVerification from '../validation/userVerification';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <UserVerification>
            <NoteList />
          </UserVerification>
        } />
        <Route path="/notes/new" element={
          <UserVerification>
            <NoteForm />
          </UserVerification>
        } />
        <Route path="/notes/edit/:noteId" element={
          <UserVerification>
            <NoteForm />
          </UserVerification>
        } />
        <Route path="/login" element={<UserVerification><Login /></UserVerification>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
