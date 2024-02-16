import React, {useEffect, useState} from 'react'
import 'dotenv/config'
import axios from 'axios'

const url = import.meta.env.API_URL

const ShowProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  })

  const getProducts = async () => {
    const response = await axios.get('http://localhost:3000/api/productos')
    setProducts(response.data)
  }

  return (
    <div className=' App' >
      <div className= 'container-fluid'>
        <div className=' row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
              <button className= 'btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                <i className= 'fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProducts