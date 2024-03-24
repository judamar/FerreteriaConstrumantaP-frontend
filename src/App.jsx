import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Nav.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import Products from './views/admin/Products.jsx'
import Categories from './views/admin/Categories.jsx'
import Tools from './views/admin/Tools.jsx'
import SalesStatuses from './views/admin/SalesStatuses.jsx'
import Users from './views/admin/Users.jsx'
import Providers from './views/admin/Providers.jsx'
import Sugerencias from './views/admin/Suggestions.jsx'
import ToolsStatuses from './views/admin/ToolsStatuses.jsx'
import ReservationStatuses from './views/admin/ReservationStatuses.jsx'
import Reservations from './views/admin/Reservations.jsx'
import Sales from './views/admin/sales/index.jsx'
import CreateSale from './views/admin/sales/CreateSale.jsx'
import EditSale from './views/admin/sales/EditSale.jsx'
import InvoiceTemplate from './utils/InvoiceTemplate.jsx'

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
            <Route path='/estados_reservas' element={<ReservationStatuses/>}/>
            <Route path='/reservas' element={<Reservations/>}/>
            <Route path='/estados_ventas' element={<SalesStatuses/>}/>
            <Route path='/ventas' element={<Sales/>}/>
            <Route path='/ventas/factura/:id' element={<InvoiceTemplate/>}/>
            <Route path='/ventas/crear' element={<CreateSale/>}/>
            <Route path='/ventas/editar/:id' element={<EditSale/>}/>
            <Route path='/proveedores' element={<Providers/>}/>
            <Route path='/sugerencias' element={<Sugerencias/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
