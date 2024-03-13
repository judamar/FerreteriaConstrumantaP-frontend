import React, {useEffect, useState} from 'react'
import DivAdd from '../../../components/DivAdd.jsx'
import DivTable from '../../../components/DivTable.jsx'
import DivSearch from '../../../components/DivSearch.jsx'
import { Link } from 'react-router-dom'
import { confirmation, sendRequest } from '../../../functions.jsx'

const Sales = () => {
  const [ventas, setVentas] = useState([])
  const [classLoad, setClassLoad] = useState('')
  const [classTable, setClassTable] = useState('d-none')

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getSales()
  }, [])

  const getSales = async () => {
    const apiUrl = searchTerm.trim() !== '' ? `/ventas/nombre/${searchTerm.trim()}` : '/ventas'
    const res = await sendRequest('GET', '', apiUrl, '')
    setVentas(res.data)
    setClassTable('')
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getSales();
  }

  const deleteSale = async (name, id) => {
    confirmation(name, `/ventas/${id}`, '/ventas')
  }

  return (
    <div className='container-fluid'>
      <h1 className='text-center' >VENTAS</h1>
      <DivSearch placeholder='Buscar venta por cliente' handleChange={handleSearchChange} value={searchTerm} handleSearchSubmit={handleSearchSubmit}/>
      <DivAdd>
        <Link to='create' className='btn btn-success'>
          <i className="fa-solid fa-circle-plus">
            Crear venta
          </i>
        </Link>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Factura #</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Cedula</th>
              <th>Direccion</th>
              <th>Estado</th>
              <th>Subtotal</th>
              <th>IVA</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((row, index)=>(
              <tr key={row.venta_id}>
                <td>{index+1}</td>
                <td>{row.venta_id}</td>
                <td>{row.fecha_emision}</td>
                <td>{row.nombre_cliente}</td>
                <td>{row.cedula}</td>
                <td>{row.direccion}</td>
                <td>{row.estado_venta}</td>
                <td>{row.subototal}</td>
                <td>{row.IVA}</td>
                <td>{row.total_venta}</td>
                <td>
                  <Link to={`/ventas/${row.venta_id}` } className='btn btn-primary'>
                    <i className="fa-solid fa-eye"i/>
                  </Link>
                  <button type='button' onClick={()=>deleteSale(row.nombre_cliente, row.venta_id)} className='btn btn-danger'>
                    <i className="fa-solid fa-trash"i/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  )
}

export default Sales