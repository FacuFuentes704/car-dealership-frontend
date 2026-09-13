import './BotonWhatsApp.css'

function BotonWhatsApp({ mensaje }) {
  const url = `https://wa.me/543462260147?text=${encodeURIComponent(mensaje)}`

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="boton-whatsapp">
      Consultar por WhatsApp
    </a>
  )
}

export default BotonWhatsApp