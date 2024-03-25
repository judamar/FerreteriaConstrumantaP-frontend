import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className="card m-3" style={{ width: '16rem' }}>
      <img src={product.url_imagen} className="card-img-top" alt='Imagen del producto' style={{'height':'180px'}}/>
      <div className="card-body">
        <h5 className="card-title"><strong>{product.nombre_producto}</strong></h5>
        <p className="card-text"><strong>Cantidad:</strong> {product.cantidad}</p>
        <p className="card-text">{product.descripcion}</p>
        <p className="card-text"><strong>Precio: </strong>${product.precio.toFixed(2)}</p>
        <p className="card-text"><strong>Categoria: </strong>{product.categoria}</p>
      </div>
    </div>
  )
}

export default ProductCard
