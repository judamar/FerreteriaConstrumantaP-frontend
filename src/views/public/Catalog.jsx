import React, {useState, useEffect} from 'react'
import ProductCard from '../../components/ProductCard'
import DivSelect from '../../components/DivSelect'
import { sendRequest } from '../../functions'

const Catalog = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoria_id, setCategoria_id] = useState('')


  useEffect(() => {
    getProducts()
    getCategories()
  }, [])

  const getProducts = async () => {
    const res = await sendRequest('GET', '', '/productos', '')
    setProducts(res.data)
  }

  const getCategories = async () => {
    const res = await sendRequest('GET', '', '/categorias', '')
    setCategories(res.data)
  }

  return (
    <div className="container">
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <DivSelect icon='fa-tag' value={categoria_id} required='' className='form-select' options={categories} sel='categoria' placeholder='Filtrar por Categoria' handleChange={(e)=>setCategoria_id(e.target.value)}/>
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