import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { sendRequest } from '../functions'

const InvoiceTemplate = () => {
  const { id } = useParams()
  
  const [venta, setVenta] = useState({})

  useEffect(() => {
    getVenta(id)
  }, [id])

  const getVenta = async (id) => {
    const data = await sendRequest('GET', '', `/ventas/${id}`, '')
    setVenta(data.data[0])
    console.log(venta)
  }
  
  return (
    <div className="container mt-4 border">
      <div className="row">
        <div className="col-xs-12">
          <div className="invoice-title">
            <h2>Factura</h2>
            <h3>Orden # {venta.venta_id}</h3>
          </div>
          <hr />
          <div className="row">
            <div className="col-xs-6">
              <address>
                <strong>FERRETERÍA CONSTRUMANTA P</strong><br />
                NIT: <br />
                Dirección: <br />
                Ciudad: <br />
                Teléfono: <br />
                Correo electrónico: <br />
              </address>
            </div>
            <div className="col-xs-6 text-right">
              <address>
                <strong>Facturado a:</strong><br />
                Cliente: {venta.nombre_cliente}<br />
                Cédula: {venta.cedula} <br />
                Dirección: {venta.direccion}<br />
                Teléfono: {venta.telefono}<br />
                Correo electrónico: {venta.correo_electronico}
              </address>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <address>
                <strong>Estado de venta: </strong><br />
                {venta.estado_venta}<br />
              </address>
            </div>
            <div className="col-xs-6 text-right">
              <address>
                <strong>Fecha de orden:</strong><br />
                {new Date(venta.fecha_emision).toLocaleDateString()}<br /><br />
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title"><strong>Resumen de la orden</strong></h3>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <td><strong>Artículo</strong></td>
                      <td className="text-center"><strong>Precio</strong></td>
                      <td className="text-center"><strong>Cantidad</strong></td>
                      <td className="text-right"><strong>Total</strong></td>
                    </tr>
                  </thead>
                  <tbody>
                    {venta.productos?.map((producto, index) => (
                      <tr key={producto.id}>
                        <td>{producto.producto}</td>
                        <td className="text-center">${producto.valor_unitario.toFixed(2)}</td>
                        <td className="text-center">{producto.cantidad}</td>
                        <td className="text-right">${producto.valor_total.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="thick-line" />
                      <td className="thick-line" />
                      <td className="thick-line text-center"><strong>Subtotal</strong></td>
                      <td className="thick-line text-right">${venta.subototal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="no-line" />
                      <td className="no-line" />
                      <td className="no-line text-center"><strong>IVA ({venta.IVA})</strong></td>
                      <td className="no-line text-right">${(venta.total_venta - venta.subototal).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="no-line" />
                      <td className="no-line" />
                      <td className="no-line text-center"><strong>Total</strong></td>
                      <td className="no-line text-right">${venta.total_venta.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
