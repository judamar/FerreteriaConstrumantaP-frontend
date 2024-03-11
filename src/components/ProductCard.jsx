import React from 'react'

const ProductCard = ({urlImg, name, desc, price, category, stock}) => {
  return (
    <div className="card" style="width: 18rem;">
      <img src={urlImg} className="card-img-top" alt='Imagen del producto'/>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{stock}</p>
        <p className="card-text">{desc}</p>
        <p className="card-text">{price}</p>
        <p className="card-text">{category}</p>
      </div>
</div>
  )
}

export default ProductCard