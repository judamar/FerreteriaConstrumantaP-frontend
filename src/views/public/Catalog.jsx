import React, {useState, useState, useRef} from 'react'
import ProductCard from '../../components/ProductCard'

const Catalog = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const getProducts

  return (
    products.map(product => (
      <ProductCard urlImg={product.urlImg} />
  )
}

export default Catalog