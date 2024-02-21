import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sendRequest } from '../functions.js'
import DivInput from '../components/DivInput.jsx'
import storage from '../storage/storage.jsx'

const Login = () => {
  const [cedula, setCedula] = useState('')
  const [password, setPassword] = useState('')
  const go = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    const form = {cedula: cedula, password: password}
    const res = await sendRequest('POST', form, '/login', '', false)
    if (res.status === true){
      storage.set('authToken', res.token)
      storage.set('authUser', res.data)
      go('/')
    }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Login</h1>
          <form onSubmit={login}>
            <DivInput type="text" name="cedula" label="Cedula" value={cedula} setValue={setCedula} />
            <DivInput type="password" name="password" label="Password" value={password} setValue={setPassword} />
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
          <Link to="/register" className="text-center">Registrarse</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Login</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3"></div>
    </div>
  )
}

export default Login