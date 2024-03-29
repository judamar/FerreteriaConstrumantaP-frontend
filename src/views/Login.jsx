import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sendRequest } from '../functions.jsx'
import DivInput from '../components/DivInput.jsx'
import storage from '../storage/storage.jsx'

const Login = () => {
  const [cedula, setCedula] = useState('')
  const [password, setPassword] = useState('')
  const go = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const form = {cedula, password}
    const res = await sendRequest('POST', form, '/usuarios/login', '', false)
    if (res && res.status === 'SUCCESS' && res.data.token) {
      storage.set('authToken', res.data.token)
      storage.set('authUser', res.data.user)
      if (res.data.user.esAdmin === 1) {
        go('/admin/productos')
      } else if (res.data.user.esAdmin === 0) {
        go('/catalogo')
      }
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-danger'>
            <div className="card-header bg-danger border border-danger text-white">
              Iniciar Sesión
            </div>
            <div className='card-body'>
              <form onSubmit={login}>
                <DivInput type='number' icon='fa-at' value={cedula} className='form-control' placeholder='Cédula' required='required' handleChange={(e)=> setCedula(e.target.value)}/>
                <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Contraseña' required='required' handleChange={(e)=> setPassword(e.target.value)}/>
                <div className='d-grid col-10 mx-auto'>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-danger'>
                    <i className='fa-solid fa-door-open'/> Iniciar
                  </button>
                </div>
              </form>
              <Link to='/register'>
                <i className='fa-solid fa-user-plus'/>Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login