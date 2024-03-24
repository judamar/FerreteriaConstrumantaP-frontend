import React from 'react'
import { useParams } from 'react-router-dom'
import SaleForm from '../../../components/SaleForm'

const EditSale = () => {
  const { id } = useParams()
  
  return (
    <SaleForm id={id} title='EDITAR ORDEN'/>
  )
}

export default EditSale