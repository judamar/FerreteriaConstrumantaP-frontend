import React, {useState, useEffect} from 'react'
import ProductCard from '../../components/ProductCard'
import { sendRequest } from '../../functions'

const Catalog = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
    console.log(products)
  }, [])

  const getProducts = async () => {
    const res = await sendRequest('GET', '', '/productos', '')
    setProducts(res.data)
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog