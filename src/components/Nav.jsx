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
          <img src="/logo.ico" alt="Logo" width="65" height="65" />
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
            <li className='nav-item px-lg-5'>
              <Link to='/productos' className='nav-link text-white'>Productos</Link>
            </li>
          </ul>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5 h4'>
              {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className='btn btn-warning' onClick={logout}>Salir</button>
            </li>
          </ul>
        </div>
        ) : ''}

    </nav>
  )
}

export default NavbarComponent