import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const Reservations = () => {
  const [reservas, setReservas] = useState([])
  const [id, setId] = useState('')
  const [usuario_id, setUsuario_id] = useState('')
  const [herramienta_maquina_id, setHerramienta_maquina_id] = useState('')
  const [fecha_fin, setFecha_fin] = useState('')
  const [cantidad, setCantidad] = useState('')

  const [estados_reserva, setEstados_reserva] = useState([])
  const [estado_reserva_id, setEstado_reserva_id] = useState('')

  const [usuarios, setUsuarios] = useState([])
  const 
  
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
    getReservations()
    getCategories()
  },[])

  const getReservations = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/proveedores/search/${searchTerm.trim()}` : '/proveedores'
    const res = await sendRequest('GET', '', apiUrl, '')
    setReservas(res.data)
    setClassTable('')
  }

  const getCategories = async () => {
    const res = await sendRequest('GET', '', '/categorias', '')
    setEstados_reserva(res.data)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getReservations();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const deleteProvider = async (name, id) => {
    confirmation(name, `/proveedores/${id}`, '/proveedores')
  }

  const deleteCategories = async (name, id) => {
    confirmation(name, `/proveedores_tienen_categorias/${id}`, '/proveedores')
  }

  const clear = () => {
    setUsuario_id('')
    setHerramienta_maquina_id('')
    setFecha_fin('')
    setCantidad('')
    setCorreo_proveedor('')
    setTelefono_vendedor('')
    setEstado_reserva_id('')
  }

  const openModal = (op, pr, n, np, dp, tp, c, tv, ca) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(pr)
    if (op === 1) {
      setTitle('Registrar proveedor')
    } else if (op === 2) {
      setTitle('Actualizar proveedor')
      setUsuario_id(n)
      setHerramienta_maquina_id(np)
      setFecha_fin(dp)
      setCantidad(tp)
      setCorreo_proveedor(c)
      setTelefono_vendedor(tv)
    } else {
      setTitle('Categorias del proveedor')
      setEstado_reserva_id(ca)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    body = {
      NIT: usuario_id,
      nombre_proveedor: herramienta_maquina_id,
      direccion_proveedor: fecha_fin,
      telefono_proveedor: cantidad,
      correo_proveedor: correo_proveedor,
      telefono_vendedor: telefono_vendedor
    }
    if (operation === 1) {
      method = 'POST'
      url = '/proveedores/'
    } else if (operation === 2) {
      method = 'PUT'
      url = `/proveedores/${id}`
    } else {
      method = 'POST'
      url = '/proveedores_tienen_categorias/'
      body = {
        proveedores_id: id,
        categorias_id: estado_reserva_id
      }
    }
    const res = await sendRequest(method, body, url, '', true)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getReservations()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >PROVEEDORES</h1>
      <DivSearch placeholder='Buscar proveedor' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalProveedores' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Registrar Proveedor
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>NIT</th><th>NOMBRE</th><th>E-MAIL</th><th>DIRECCION</th><th>TEL. PROVEEDOR</th><th>TEL. VENDEDOR.</th><th>CATEGORIAS</th><th /><th /><th /></tr></thead>
          <tbody className='table-group-divider'>
            {reservas.map((row, index)=>(
              <tr key={row.proveedor_id}>
                <td>{index+1}</td>
                <td>{row.NIT}</td>
                <td>{row.nombre_proveedor}</td>
                <td>{row.correo_proveedor}</td>
                <td>{row.direccion_proveedor}</td>
                <td>{row.telefono_proveedor}</td>
                <td>{row.telefono_vendedor}</td>
                <td>{row.categorias}</td>
                <td>
                  <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProveedores' onClick={()=> openModal(2, row.proveedor_id, row.NIT, row.nombre_proveedor, row.direccion_proveedor, row.telefono_proveedor, row.correo_proveedor, row.telefono_vendedor)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalProveedorCategoria' onClick={()=> openModal(3, row.proveedor_id)}>
                    <i className='fa-solid fa-tag'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={()=> deleteProvider(row.nombre_proveedor, row.proveedor_id)}>
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
          <DivInput type='number' icon='fa-at' value={usuario_id} className='form-control' placeholder='NIT Proveedor' required='required' handleChange={(e)=> setUsuario_id(e.target.value)}/>
          <DivInput type='text' icon='fa-user' value={herramienta_maquina_id} className='form-control' placeholder='Nombre Proveedor' required='required' handleChange={(e)=> setHerramienta_maquina_id(e.target.value)}/>
          <DivInput type='email' icon='fa-envelope' value={correo_proveedor} className='form-control' placeholder='Correo Electrónico' required='required' handleChange={(e)=> setCorreo_proveedor(e.target.value)}/>
          <DivInput type='text' icon='fa-location-dot' value={fecha_fin} className='form-control' placeholder='Dirección' required='required' handleChange={(e)=> setFecha_fin(e.target.value)}/>
          <DivInput type='number' icon='fa-phone' value={cantidad} className='form-control' placeholder='Teléfono proveedor' required='required' handleChange={(e)=> setCantidad(e.target.value)}/>
          <DivInput type='number' icon='fa-phone' value={telefono_vendedor} className='form-control' placeholder='Teléfono vendedor' required='required' handleChange={(e)=> setTelefono_vendedor(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Guardar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>Cerrar</button>
        </div>
      </Modal>
      <Modal title={title} modal='modalProveedorCategoria'>
        <div className='modal-body'>
          <DivSelect icon='fa-tag' value={estado_reserva_id} required='required' className='form-select' options={estados_reserva} sel='categoria' handleChange={(e)=>setEstado_reserva_id(e.target.value)}/>
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Añadir
            </button>
            <br/>
            <button type='button' className='btn btn-danger' onClick={()=> deleteCategories('Categorias', id)}>
              <i className='fa-solid fa-trash'/>Eliminar categorias
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

export default Reservations