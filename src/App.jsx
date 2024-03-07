import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Nav.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import Products from './views/admin/Products.jsx'
import Categories from './views/admin/Categories.jsx'
import Tools from './views/admin/Tools.jsx'
import Users from './views/admin/Users.jsx'
import Providers from './views/admin/Providers.jsx'
import Sugerencias from './views/admin/Suggestions.jsx'
import ToolsStatuses from './views/admin/ToolsStatuses.jsx'

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
            <Route path='/usuarios' element={<Users/>}/>
            <Route path='/productos' element={<Products/>}/>
            <Route path='/categorias' element={<Categories/>}/>
            <Route path='/herramientas' element={<Tools/>}/>
            <Route path='/estados_herramientas' element={<ToolsStatuses/>}/>
            <Route path='/proveedores' element={<Providers/>}/>
            <Route path='/sugerencias' element={<Sugerencias/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
