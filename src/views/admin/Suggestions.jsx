import React,{ useEffect, useState, useRef } from 'react'
import { confirmation, sendRequest } from '../../functions.jsx'
import DivAdd from '../../components/DivAdd.jsx'
import DivInput from '../../components/DivInput.jsx'
import Modal from '../../components/Modal.jsx'
import SuggestionCard from '../../components/SuggestionCard.jsx'
import storage from '../../storage/storage.jsx'

const Suggestions = () => {
  const [sugerencias, setSugerencias] = useState([])
  const [userId, setUserId] = useState('')
  const [message, setMessage] = useState('')

  const NameInput = useRef()
  const close = useRef()

  useEffect(() => {
    getSugerencias()
    setUserId(storage.get('authUser').id)
  }, [])

  const getSugerencias = async () => {
    const res = await sendRequest('GET', '', '/sugerencias', '')
    setSugerencias(res.data)
  }

  const deleteSugerencia = async (id) => {
    confirmation('', `/sugerencias/${id}`, '/sugerencias')
  }

  const clear = () => {
    setMessage('')
  }

  const save = async () => {
    const body = {
      usuarios_id: userId,
      mensaje: message
    }
    const res = await sendRequest('POST', body, '/sugerencias', '')
    if (res.status === 'SUCCESS') {
      clear()
      getSugerencias()
      close.current.click()
      setTimeout( ()=> {if (NameInput.current) {
        NameInput.current.focus()
      }}, 3000)
    }
  }


  return (
    <div className='container-fluid'>
      <h1 className='text-center' >SUGERENCIAS</h1>
      <DivAdd>
        {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
        <button className='btn btn-success mb-3' data-bs-toggle='modal' data-bs-target='#modalSugerencia'>
          <i className='fa-solid fa-circle-plus'/>
          Añadir Sugerencia
        </button>
      </DivAdd>
      <div className='row'>
        {sugerencias.map((row) => (
          <div key={row.id} className='col-md-3 mb-4'>
            <SuggestionCard username={row.nombre_completo} message={row.mensaje} handleClick={() => deleteSugerencia(row.id)} />
          </div>
        ))}
      </div>
      <Modal title='Enviar sugerencia' modal='modalSugerencia'>
        <div className='modal-body'>
          <DivInput
            type='text'
            icon='fa-comment'
            value={message}
            className='form-control'
            placeholder='Mensaje'
            required='required'
            ref={NameInput}
            handleChange={(e) => setMessage(e.target.value)}
          />
          <div className='d-grid col-10 mx-auto'>
            <button type='button' className='btn btn-success' onClick={save}>
              <i className='fa-solid fa-save'/>Enviar
            </button>
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={close}>
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Suggestions