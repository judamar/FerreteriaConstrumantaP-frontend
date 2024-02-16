import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ShowProducts from './components/ShowProducts.jsx'
import Header from './components/Header.jsx'
import Login from './views/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ShowProducts/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
