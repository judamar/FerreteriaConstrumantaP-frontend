import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Nav.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<h1>Home</h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
