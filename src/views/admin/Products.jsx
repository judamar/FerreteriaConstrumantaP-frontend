import React,{ useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivInput from '../../components/DivInput.jsx'
import DivSearch from '../../components/DivSearch.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'
import storage from '../../storage/storage.jsx'

const Products = () => {
  const [productos, setProductos] = useState([])
  const [id, setId] = useState('')
  const [nombre_producto, setNombre_producto] = useState('')
  const [image, setImage] = useState('')
  const [marca, setMarca] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria_id, setCategoria_id] = useState('')

  const [categorias, setCategorias] = useState([])
  
  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')
  
  const NameInput = useRef()
  const close = useRef()

  let method = ''
  let url = ''

  useEffect(()=>{
    getProducts()
    getCategory()
  },[])

  const getProducts = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/productos/search/${searchTerm.trim()}` : '/productos'
    const res = await sendRequest('GET', '', apiUrl, '')
    setProductos(res.data)
    setClassTable('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getProducts();
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const deleteProduct = async (id) => {
    confirmation(id, `/productos/${id}`, '/productos')
  }

  const clear = () => {
    setNombre_producto('')
    setMarca('')
    setDescripcion('')
    setPrecio('')
    setCantidad('')
    setCategoria_id('')
  }

  const getCategory = async () => {
    const res = await sendRequest('GET', '', '/categorias', '')
    setCategorias(res.data)
  }

  const openModal = (op, n, m, d, p, c, ca, pr) => {
    clear()
    setTimeout( ()=> NameInput.current.focus(), 600)
    setOperation(op)
    setId(pr)
    if (op === 1) {
      setTitle('Agregar producto')
    } else {
      setTitle('Actualizar producto')
      setNombre_producto(n)
      setMarca(m)
      setDescripcion(d)
      setPrecio(p)
      setCantidad(c)
      setCategoria_id(ca)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    if (operation === 1) {
      method = 'POST'
      url = '/productos'
      } else {
        method = 'PUT'
        url = `/productos/${id}`
      }
    const form = new FormData()
    form.append('nombre_producto', nombre_producto)
    form.append('marca', marca)
    form.append('descripcion', descripcion)
    form.append('precio', precio)
    form.append('cantidad', cantidad)
    form.append('categoria_id', categoria_id)
    form.append('image', image)

    console.log(form)
    const res = await sendRequest(method, form, url, '')
    if (method === 'PUT' && res.status === 'SUCCESS') {
      close.current.click()
    }
    if (res.status === 'SUCCESS') {
      clear()
      getProducts()
      setTimeout(()=> NameInput.current.focus(), 3000)
    }
  } 

  return (
    <div className='container-fluid'>
      <DivSearch placeholder='Buscar productos' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
        <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalProductos' onClick={()=> openModal(1)}>
          <i className='fa-solid fa-circle-plus'/>
          Añadir producto
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>PRODUCTO</th><th>CLAVE</th><th>MARCA</th><th>CATEGORIA</th><th>CANTIDAD</th><th>PRECIO/U</th><th>TOTAL</th><th></th><th></th></tr></thead>
          <tbody className='table-group-divider'>
            {productos.map((row, index)=>(
              <tr key={row.id}>
                <td>{index+1}</td>
                <td>{row.nombre_producto}</td>
                <td>{row.clave_producto}</td>
                <td>{row.marca}</td>
                <td>{row.categoria}</td>
                <td>{row.cantidad}</td>
                <td>{`$${row.precio}`}</td>
                <td>{`$${row.precio * row.cantidad}`}</td>
                <td>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProductos' onClick={()=> openModal(2, row.nombre_producto, row.marca, row.descripcion, row.precio, row.cantidad, row.categoria, row.id)}>
                    <i className='fa-solid fa-pen-to-square'/>
                  </button>
                </td>
                <td>
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className='btn btn-danger' onClick={()=> deleteProduct(row.id)}>
                    <i className='fa-solid fa-trash'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalProductos'>
        <div className='modal-body'>
          <DivInput type='text' icon='fa-hammer' value={nombre_producto} className='form-control' placeholder='Nombre Producto' required='required' ref={NameInput} handleChange={(e)=>setNombre_producto(e.target.value)}/>
          <DivInput type='text' icon='fa-trademark' value={marca} className='form-control' placeholder='Marca' required='required' handleChange={(e)=>setMarca(e.target.value)}/>
          <DivInput type='text' icon='fa-file-lines' value={descripcion} className='form-control' placeholder='Descripcion' required='required' handleChange={(e)=>setDescripcion(e.target.value)}/>
          <DivInput type='number' icon='fa-dollar-sign' value={precio} className='form-control' placeholder='Precio' required='required' handleChange={(e)=>setPrecio(e.target.value)}/>
          <DivInput type='number' icon='fa-box' value={cantidad} className='form-control' placeholder='Cantidad' required='required' handleChange={(e)=>setCantidad(e.target.value)}/>
          <DivSelect icon='fa-tag' value={categoria_id} required='required' className='form-select' options={categorias} sel='categoria' handleChange={(e)=>setCategoria_id(e.target.value)}/>
          <DivInput type='file' icon='fa-image' value={image} className='form-control' placeholder='Imagen' required='required' handleChange={(e)=>setImage(e.target.value)}/>
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

export default Products