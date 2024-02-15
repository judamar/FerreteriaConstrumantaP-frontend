import React, {useEffect, useState} from 'react'
import 'dotenv/config'
import { show_alert } from '../functions.js'

const ShowProducts = () => {
  const url = PROCESS.ENV.API_URL
  const {products, setProducts} = useState()
  return (
    <div>

    </div>

  )
}

export default ShowProducts