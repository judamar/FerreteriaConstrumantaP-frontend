import { Link, useNavigate } from 'react-router-dom'
import storage from '../storage/storage.jsx'

const NavbarComponent = () => {
  const go = useNavigate()
  const logout = () => {
    storage.delete('authToken')
    storage.delete('authUser')
    go('/login')
  } 
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.ico" alt="Logo" width="75" height="75" />
        </Link>
        <Link className="navbar-brand text-white h1" to="/">CONSTRUMANTA P.</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      { storage.get('authUser') ? (
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2">
            <li className='nav-item px-lg-5 h4'>
              {storage.get('authUser').nombre}
            </li>
            <li className="nav-item dropdown">
              {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventarios
              </a>
              <ul className="dropdown-menu">
                <li className='px-lg-3'>
                  <Link to='/productos' className='dropdown-item'>Productos</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/categorias' className='dropdown-item'>Categorias</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/herramientas' className='dropdown-item'>Herramientas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/estados_herramientas' className='dropdown-item'>Estados Herramientas</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ventas
              </a>
              <ul className="dropdown-menu">
                <li className='px-lg-3'>
                  <Link to='/estados_ventas' className='dropdown-item'>Estados ventas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/ventas' className='dropdown-item'>Ventas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/estados_reservas' className='dropdown-item'>Estados reservas</Link>
                </li>
                <li className='px-lg-3'>
                  <Link to='/reservas' className='dropdown-item'>Reservas</Link>
                </li>
              </ul>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/usuarios' className='nav-link text-white'>Usuarios</Link> 
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/proveedores' className='nav-link text-white'>Proveedores</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/sugerencias' className='nav-link text-white'>Sugerencias</Link>
            </li>
          </ul>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5 h4'>
              <button type='button' className='btn btn-warning' onClick={logout}>Salir</button>
            </li>
          </ul>
        </div>
        ) : ''}
    </nav>
  )
}

export default NavbarComponent