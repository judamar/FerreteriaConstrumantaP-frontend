import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'dotenv/config'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from 'axios'

window.axios = axios

window.axios.defaults.baseURL = import.meta.env.API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
