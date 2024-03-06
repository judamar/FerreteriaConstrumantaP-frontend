import React,{ useEffect, useState, useRef } from 'react'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'

const ToolsStatuses = () => {
  const [estados, setEstados] = useState([])
  const [id, setId] = useState('')
  const [estado, setEstado] = useState('')
  
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
    getStatuses()
  },[])

  const getStatuses = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/estados_herramientas_maquinas/search/${searchTerm.trim()}` : '/categorias'
    const res = await sendRequest('GET', '', apiUrl, '')
    setEstados(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getStatuses();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const deleteCategory = async (name , id) => {
    confirmation(name, `/categorias/${id}`, '/categorias')
  }

  const clear = () => {
    setEstado('')
  }

  const openModal = (op, id, c) => {
    clear()
    setTimeout( ()=> {if (NameInput.current) {
      NameInput.current.focus()
    }}, 600)
    setOperation(op)
    setId(id)
    if (op === 1) {
      setTitle('Añadir categoría')
    } else {
      setTitle('Actualizar categoría')
      setEstado(c)
    }
  }

  const save = async (e) => {
    body = {
      categoria: estado
    }
    e.preventDefault()
    if (operation === 1) {
      method = 'POST'
      url = '/categorias'
    } else {
      method = 'PUT'
      url = `/categorias/${id}`
    }
    const res = await sendRequest(method, body, url, '', true)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getStatuses()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >CATEGORIAS</h1>
      <DivSearch placeholder='Buscar categorias' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        <button type='button' className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalCategorias' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Añadir categoría
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>CATEGORÍA</th><th /><th /></tr></thead>
          <tbody className='table-group-divider'>
            {estados.map((row, index)=>(
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.categoria}</td>
                <td>
                  <button type='button' className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalCategorias' onClick={()=> openModal(2, row.id, row.categoria)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  <button type='button' className='btn btn-danger' onClick={()=> deleteCategory(row.categoria, row.id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalCategorias'>
        <div className='modal-body'>
          <DivInput type='text' icon='fa-tag' value={estado} className='form-control' placeholder='Categoría' required='required' handleChange={(e)=> setEstado(e.target.value)}/>
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
    </div>
  )
}

export default ToolsStatuses