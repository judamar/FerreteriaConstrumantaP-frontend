import React,{ useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import DivAdd from '../../components/DivAdd.jsx'
import DivTable from '../../components/DivTable.jsx'
import DivSelect from '../../components/DivSelect.jsx'
import DivInput from '../../components/DivInput.jsx'
import Modal from '../../components/Modal.jsx'
import { confirmation, sendRequest } from '../../functions.jsx'
import { PaginationControl } from 'react-bootstrap-pagination-control'

const Products = () => {
  const [productos, setProductos] = useState([])
  const [id, setId] = useState('')
  const [nombre_producto, setNombre_producto] = useState('')
  const [clave_producto, setClave_producto] = useState('')
  const [url_imagen, setUrl_imagen] = useState('')
  const [marca, setMarca] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  
  const [operation, setOperation] = useState('')
  const [title, setTitle] = useState('')
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')
  const [rows, setRows] = useState(0)
  
  const NameInput = useRef()
  const close = useRef()

  let method = ''
  let url = ''

  useEffect(()=>{
    getProducts(1)
  },[])

  const getProducts = async () => {
    const res = await sendRequest('GET', '', '/productos', '')
    setProductos(res.data)
    setRows(res.rows)
    setClassTable('')
    setClassLoad('d-none')
  }
  
  const deleteProduct = async (id) => {
    confirmation(id, `/productos/${id}`, '/products')
  }

  const clear = () => {
    setNombre_producto('')
    setMarca('')
    setDescripcion('')
    setPrecio('')
    setCantidad('')
    setCategoria('')
  }

  const openModal = (op, n, m, d, p, c, ca) => {
    clear()
    setTimeout( ()=> NameInput.current.focus(), 600)
    setOperation(op)
    if (op === 'add') {
      setTitle('Agregar producto')
    } else {
      setTitle('Actualizar empleado')
      setNombre_producto(n)
      setMarca(m)
      setDescripcion(d)
      setPrecio(p)
      setCantidad(c)
      setCategoria(ca)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    if (operation === 'add') {
      method = 'POST'
      url = '/productos'
      } else {
        method = 'PUT'
        url = `/productos/${id}`
      }
    const form = {
      nombre_producto: nombre_producto,
      clave_producto: clave_producto,
      url_imagen: url_imagen,
      marca: marca,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad,
      categoria_id: categoria
    }
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
      <DivAdd>
        <Link to='create' className='btn btn-dark'>
          <i className='fa-solid fa-circle-plus'/> Agregar
        </Link>
      </DivAdd>
    </div>
  )
}

export default Products