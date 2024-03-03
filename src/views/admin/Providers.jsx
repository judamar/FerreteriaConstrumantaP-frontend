import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const Users = () => {
  const [proveedores, setProveedores] = useState([])
  const [id, setId] = useState('')
  const [NIT, setNIT] = useState('')
  const [nombre_proveedor, setNombre_proveedor] = useState('')
  const [direccion_proveedor, setDireccion_proveedor] = useState('')
  const [telefono_proveedor, setTelefono_proveedor] = useState('')
  const [correo_proveedor, setCorreo_proveedor] = useState('')
  const [telefono_vendedor, setTelefono_vendedor] = useState('')

  const [categorias, setCategorias] = useState('')
  
  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')
  
  const NameInput = useRef(null)
  const close = useRef()

  let method = ''
  let url = ''
  let body = {}

  useEffect(()=>{
    getProviders()
  },[])

  const getProviders = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/proveedores/search/${searchTerm.trim()}` : '/proveedores'
    const res = await sendRequest('GET', '', apiUrl, '')
    setProveedores(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getProviders();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const deleteProvider = async (name , id) => {
    confirmation(name, `/proveedores/${id}`, '/proveedores')
  }

  const clear = () => {
    setNIT('')
    setNombre_proveedor('')
    setDireccion_proveedor('')
    setTelefono_proveedor('')
    setCorreo_proveedor('')
    setTelefono_vendedor('')
  }

  const openModal = (op, pr, n, np, dp, tp, c, tv) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(pr)
    if (op === 1) {
      setTitle('Registrar proveedor')
    } else {
      setTitle('Actualizar proveedor')
      setNIT(n)
      setNombre_proveedor(np)
      setDireccion_proveedor(dp)
      setTelefono_proveedor(tp)
      setCorreo_proveedor(c)
      setTelefono_vendedor(tv)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    body = {
      NIT: NIT,
      nombre_proveedor: nombre_proveedor,
      direccion_proveedor: direccion_proveedor,
      telefono_proveedor: telefono_proveedor,
      correo_proveedor: correo_proveedor,
      telefono_vendedor: telefono_vendedor
    }
    if (operation === 1) {
      method = 'POST'
      url = '/proveedores/'
    } else {
      method = 'PUT'
      url = `/proveedores/${id}`
    }
    const res = await sendRequest(method, body, url, '', true)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getProviders()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <DivSearch placeholder='Buscar proveedor' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
        <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalProveedores' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Registrar Proveedor
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>NIT</th><th>NOMBRE</th><th>E-MAIL</th><th>DIRECCION</th><th>TEL. PROVEEDOR</th><th>TEL. VENDEDOR.</th><th></th><th></th></tr></thead>
          <tbody className='table-group-divider'>
            {proveedores.map((row, index)=>(
              <tr key={row.proveedor_id}>
                <td>{index+1}</td>
                <td>{row.NIT}</td>
                <td>{row.nombre_proveedor}</td>
                <td>{row.correo_proveedor}</td>
                <td>{row.direccion_proveedor}</td>
                <td>{row.telefono_proveedor}</td>
                <td>{row.telefono_vendedor}</td>
                <td>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProveedores' onClick={()=> openModal(2, row.proveedor_id, row.NIT, row.nombre_proveedor, row.direccion_proveedor, row.telefono_proveedor, row.correo_proveedor, row.telefono_vendedor)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-danger' onClick={()=> deleteProvider(row.nombre_proveedor, row.proveedor_id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalProveedores'>
        <div className='modal-body'>
          <DivInput type='number' icon='fa-at' value={NIT} className='form-control' placeholder='NIT Proveedor' required='required' handleChange={(e)=> setNIT(e.target.value)}/>
          <DivInput type='text' icon='fa-user' value={nombre_proveedor} className='form-control' placeholder='Nombre Proveedor' required='required' handleChange={(e)=> setNombre_proveedor(e.target.value)}/>
          <DivInput type='email' icon='fa-envelope' value={correo_proveedor} className='form-control' placeholder='Correo Electrónico' required='required' handleChange={(e)=> setCorreo_proveedor(e.target.value)}/>
          <DivInput type='text' icon='fa-location-dot' value={direccion_proveedor} className='form-control' placeholder='Dirección' required='required' handleChange={(e)=> setDireccion_proveedor(e.target.value)}/>
          <DivInput type='number' icon='fa-phone' value={telefono_proveedor} className='form-control' placeholder='Teléfono proveedor' required='required' handleChange={(e)=> setTelefono_proveedor(e.target.value)}/>
          <DivInput type='number' icon='fa-phone' value={telefono_vendedor} className='form-control' placeholder='Teléfono proveedor' required='required' handleChange={(e)=> setTelefono_vendedor(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal>
    </div>
  )
}

export default Users