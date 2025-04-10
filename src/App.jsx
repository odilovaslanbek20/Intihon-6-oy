import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import "./index.css";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import NotFound from './pages/NotFound';

function isAuth() {
  return localStorage.getItem('token') !== null;  
}

function ProtectedRoute() {
  return isAuth() ? <Outlet /> : <Navigate to='/signIn' />; 
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signIn' element={<SignIn />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/teachers' element={<Teachers />} />
        </Route>
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
