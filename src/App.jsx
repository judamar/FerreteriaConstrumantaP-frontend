import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import ShowProducts from './components/ShowProducts.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

function Header() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ShowProducts}>
        </Route>
        <Route path='/whatsapp' element={<WhatsAppButton/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Header
