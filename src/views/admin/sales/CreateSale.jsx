import React, {useState, useEffect} from 'react'
import { sendRequest } from '../../../functions'

const CreateSale = () => {
  const [usuarios, setUsuarios] = useState([])
  const [productos, setProductos] = useState([])

  useEffect(() => {
    getUsuarios()
    getProductos()
  }, [])

  const getUsuarios = async () => {
    const res = await sendRequest('get', '', '/usuarios', '')
    setUsuarios(res.data)
  }

  const getProductos = async () => {
    const res = await sendRequest('get', '', '/productos', '')
    setProductos(res.data)
  }

  return (
    <div>CreateSale</div>
  )
}

export default CreateSale