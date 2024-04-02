import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const WhatsAppIn = () => {
  return (
    <FloatingWhatsApp phoneNumber='+573197588522' accountName='Construmanta P' avatar='./logo.ico' statusMessage='Responde aproximadamente en 1 hora.' chatMessage='Hola, ¿en qué puedo ayudarte?' placeholder='Escribe un mensaje.'/>
  )
}

export default WhatsAppIn