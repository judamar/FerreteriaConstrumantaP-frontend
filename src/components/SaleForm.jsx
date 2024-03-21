import React, { useEffect, useState, useRef } from 'react'
import DivInput from './DivInput.jsx'
import DivSelect from './DivSelect.jsx'
import { sendRequest } from '../functions.jsx'

const SaleForm = (params) => {
  const [venta_id, setVenta_id] = useState(0)
  const [usuarios, setUsuarios] = useState([])
  const [estados, setEstados] = useState([])
  const [productos, setProductos] = useState([])

  const [usuario_id, setUsuario_id] = useState('')
  const [estado_id, setEstado_id] = useState('')
  const [tipo, setTipo] = useState('')
  const [producto_id, setProducto_id] = useState('')
  const [cantidad, setCantidad] = useState('')

  const NameInput = useRef()
  let method = 'POST'
  let url = '/ventas'
  let redirect = ''

  useEffect(() => {
    NameInput.current.focus()
    getSale()
    getUsuarios()
    getEstados()
    getProductos()
  }, [])

  const getSale = async () => {
    if (params.id !== null) {
      const res = await sendRequest('GET', '', `/ventas/${params.id}`, '')
      setUsuario_id(res.data.usuarios_id)
      setEstado_id(res.data.estado_venta_id)
      setTipo(res.data.tipo)
    }
  }

  const getUsuarios = async () => {
    const res = await sendRequest('GET', '', '/usuarios', '')
    setUsuarios(res.data)
  }
  const getEstados = async () => {
    const res = await sendRequest('GET', '', '/estados_venta', '')
    setEstados(res.data)
  }
  const getProductos = async () => {
    const res = await sendRequest('GET', '', '/productos', '')
    setProductos(res.data)
  }

  const saveSale = async (e) => {
    e.preventDefault()
    if (params.id !== null) {
      method = 'PUT'
      url = `/ventas/${params.id}`
      redirect = '/'
    }
    const body = {
      usuarios_id: usuario_id,
      estados_ventas_id: estado_id,
      tipo: tipo
    }
    const res = await sendRequest(method, body, url, redirect)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      setUsuario_id('')
      setEstado_id('')
      setTipo('')
    }
  }

  return (
    <div>SaleForm</div>
  )
}

export default SaleForm