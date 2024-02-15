import React, {useEffect, useState} from 'react'
import 'dotenv/config'
import { show_alert } from '../functions.js'
import axios from 'axios'

const ShowProducts = () => {
  const url = PROCESS.ENV.API_URL
  const {products, setProducts} = useState([])
  const {id, setId} = useState('')
  const {name, setName} = useState('')
  const {brand, setBrand} = useState('')
  const {description, setDescription} = useState('')
  const {price, setPrice} = useState('')
  const {stock, setStock} = useState('')
  const {image, setImage} = useState('')
  const {category, setCategory} = useState('')
  const {operation, setOperation} = useState(1)
  const {title, setTitle} = useState('')

  useEffect(() => {
    getProducts()
  })

  const getProducts = async () => {
    const response = await axios.get(url + 'productos')
    setProducts(response.data)
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-12'>
            <table className='table table-striped table-bordered table-hover'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Imagen</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    
        </div>
      </div>
      <div className='modal fade'>

      </div>
    </div>
  )
}

export default ShowProducts