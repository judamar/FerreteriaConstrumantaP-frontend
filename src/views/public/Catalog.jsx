import React, {useState, useState, useRef} from 'react'
import ProductCard from '../../components/ProductCard'
import { sendRequest } from '../../functions'

const Catalog = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const getProducts = async () => {
    const response = await sendRequest('GET', '/products')
    setProducts(response)
  }

  const searchProducts = async () => {
    const response = await sendRequest('GET', `/products?search=${search}`)
    setProducts(response)
  }

  const sortProducts = async () => {
    

  return (
    products.map(product => (
      <ProductCard urlImg={product.urlImg} />
    ))
  )
}

export default Catalog