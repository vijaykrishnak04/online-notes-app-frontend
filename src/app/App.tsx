// src/app/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingRoutes from '../frameworks/routes/LandingRoutes';
import NotesRoutes from '../frameworks/routes/NotesRoutes';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/notes/*' element={<NotesRoutes />} ></Route>
        <Route path="/*" element={<LandingRoutes />} ></Route>
      </Routes>
    </Router>
  );
};

export default App;
