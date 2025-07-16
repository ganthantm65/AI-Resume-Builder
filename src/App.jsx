import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import DashBoard from './pages/DashBoard'
import MultiForm from './pages/MultiForm'
import Result from './pages/Result'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/auth/register' element={<SignUp/>}/>
        <Route path='/form' element={<MultiForm/>}/>
        <Route path='/resume' element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
 