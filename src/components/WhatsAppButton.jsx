import React from 'react'

const WhatsAppButton = ({producto}) => {
  const phoneNumber = '+573197588522'
  const message = `Hola, ¿cómo estás?\nQuisiera obtener información sobre este producto:\n*${producto}*. \nGracias`

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <button type='button' className="btn btn-success" onClick={handleClick}>
      <i className="fab fa-whatsapp"/> Preguntanos
    </button>
  );
};

export default WhatsAppButton;
