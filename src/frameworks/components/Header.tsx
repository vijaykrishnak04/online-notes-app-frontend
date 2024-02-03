// src/frameworks/components/Header.tsx
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../features/notes/noteSlice';
const Header = () => {
  const dispatch = useDispatch(); // Create a dispatch function
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState())
    navigate('/')
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button className='bg-red-300 text-amber-500' onClick={handleLogout}>LogOut</button>
      </nav>
    </header>
  );
};

export default Header;
