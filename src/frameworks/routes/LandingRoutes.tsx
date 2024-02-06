import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import UserVerification from '../../validation/userVerification';

const LandingRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<UserVerification><Login /></UserVerification>} ></Route>
            <Route path='/register' element={<Register />} ></Route>
        </Routes>
    )
}

export default LandingRoutes
