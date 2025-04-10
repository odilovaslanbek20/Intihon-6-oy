import { Route, Routes } from 'react-router-dom'
import "./index.css"
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Teachers from './pages/Teachers'
import NotFound from './pages/Notfound'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />}/>
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/teachers' element={<Teachers />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
