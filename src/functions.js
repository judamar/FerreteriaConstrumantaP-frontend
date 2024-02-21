import Swal from 'sweetalert2'
import storage from './storage/storage.jsx'
import { axios } from 'axios'
import { send } from 'vite'

export const showAlert = (text, icon) => {
  Swal.fire({
    text: text,
    icon: icon,
    buttonsStyling: true
  })
}

export const sendRequest = async(method, params, url, dir='', token=true) => {
  if (token) {
    const authToken = storage.get('authToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }
  let res
  await axios({ method: method, url: url, data: params }).then(
    response => {
      res = response.data
      (method !== 'GET') ? showAlert(response.data.message, 'success') : ''
      setTimeout( () => 
        (redir !== '') ? window.location.href = redir : '', 2000
      )
    }
  ).catch((errors) => {
    let desc = '' 
    res = errors.response.data 
    errors.response.data.errors.map((e) => {
      desc = `${desc} ${e}`
      showAlert(desc, 'error')
    })
  })
  return res
}

export const confirmation = async(name, url, redir) => {
  const alert = Swal.mixin({buttonsStyling:true})
  alert.fire({
    title: `Estas seguro de eliminar ${name}`,
    icon: 'question', showCancelButton: true, 
    confirmButtonText: '<i className="fa-solid fa-check"/>Sí, eliminar',
    cancelButtonText: '<i className="fa-solid fa-ban"/>Cancelar'
  }).then((result) => {
    if(result.isConfirmed){
      sendRequest('DELETE', {}, url, redir)
    }
  })
}

export default showAlert
