import React, { useEffect, useState, useRef } from 'react'
import DivInput from './DivInput.jsx'
import DivSelect from './DivSelect.jsx'
import DivTable from './DivTable.jsx'
import { sendRequest } from '../functions.jsx'

const SaleForm = (params) => {
  const [venta_id, setVenta_id] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [estados, setEstados] = useState([])
  const [productos, setProductos] = useState([])

  const [detalle_venta, setDetalle_venta] = useState([])

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

  const handleChangeType = (e) => {
    setTipo(e.target.value)
  }

  const saveSale = async (e) => {
    e.preventDefault()
    if (params.id !== null) {
      method = 'PUT'
      url = `/ventas/${params.id}`
      redirect = '/'
    }
    const bodySale = {
      usuarios_id: usuario_id,
      estados_ventas_id: estado_id,
      tipo: tipo
    }
    const res = await sendRequest(method, bodySale, url, redirect)
    setVenta_id(res.data.insertId)
    if (method === 'PUT' && res.status === 'SUCCESS') {
      setUsuario_id('')
      setEstado_id('')
      setTipo('')
    }
  }

  const saveDetail = async (e) => {
    e.preventDefault()
    const bodyDetail = {
      ventas_id: venta_id,
      productos_id: producto_id,
      cantidad: cantidad
    }

    setDetalle_venta([...detalle_venta, bodyDetail])
    setProducto_id('')
    setCantidad('')
  }

  const save = async (e) => {
    e.preventDefault()
    await saveSale()
    detalle_venta.forEach(async (item) => {
      item.ventas_id = venta_id
    })
    for (let i = 0; i < detalle_venta.length; i++) {
      console.log(detalle_venta[i])
      await sendRequest('POST', detalle_venta[i], '/detalle_venta', '')
    }
    setDetalle_venta([])
    setProducto_id('')
    setCantidad('')
    setVenta_id('')
    setUsuario_id('')
    setEstado_id('')
    setTipo('')
  }

  return (
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <div className="card border border-danger">
            <div className="card-header bg-danger text-white border border-danger">
              {params.title}
            </div>
            <div className="card-body">
              <form onSubmit={save}>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value='FACTURA DE VENTA' onChange={handleChangeType}/>
                    <label className="form-check-label" for="flexRadioDefault1">
                      FACTURA DE VENTA
                    </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value='COTIZACIÓN' onChange={handleChangeType}/>
                  <label className="form-check-label" for="flexRadioDefault2">
                    COTIZACIÓN
                  </label>
                </div>
                <DivSelect icon='fa-user' value={usuario_id} required='required' className='form-select' options={usuarios} sel='nombre_completo' handleChange={(e)=>setUsuario_id(e.target.value)}/>
                <DivSelect icon='fa-tag' value={estado_id} required='required' className='form-select' options={estados} sel='estado' handleChange={(e)=>setEstado_id(e.target.value)}/>
                <div className='text-center'>--------------------------------------------------------------</div>
                <DivSelect icon='fa-hammer' value={producto_id} required='' className='form-select' options={productos} sel='nombre_producto' sel2='precio' separator=' - $' handleChange={(e)=>setProducto_id(e.target.value)}/>
                <DivInput icon='fa-boxes' type='number' value={cantidad} required='' className='form-control' placeholder='Cantidad' handleChange={(e)=>setCantidad(e.target.value)}/>
                <button className='btn btn-success mt-3' type='button' onClick={saveDetail}>Añadir Producto</button>
                <button className='btn btn-success mt-3' type='button' onClick={save}>Crear Orden</button>
              </form>
            </div>
          </div>
          <DivTable col='10' off='1' classLoad='' classTable=''>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {detalle_venta.map((det, index) => (
                <tr key={index+1}>
                  <td>{det.productos_id}</td>
                  <td>{det.cantidad}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='2' className='text-center'>
                  <button className='btn btn-primary' type='submit'>Guardar</button>
                </td>
              </tr>
            </tfoot>
            <div className='text-center'>--------------------------------------------------------------</div>
            <div className='text-center'>Total: {detalle_venta.length}</div>
          </DivTable>
        </div>
      </div>
    </div>
  )
}

export default SaleForm