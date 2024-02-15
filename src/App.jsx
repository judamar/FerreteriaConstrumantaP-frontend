import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import ShowProducts from './components/ShowProducts.js'

function Header() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowProducts></ShowProducts>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Header
