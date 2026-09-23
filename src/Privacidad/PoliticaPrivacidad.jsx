import { useEffect } from 'react'
import useTitulo from '../hooks/useTitulo'
import './PoliticaPrivacidad.css'

function PoliticaPrivacidad() {
  useTitulo("Política de Privacidad")

  return (
    <div className="politica container">
      <h1>Política de Privacidad</h1>
      <p className="politica-fecha">Última actualización: {new Date().toLocaleDateString('es-AR')}</p>

      <section>
        <h2>1. Datos que recolectamos</h2>
        <p>
          En LGi Motors recolectamos únicamente los datos necesarios para gestionar 
          el contacto y las operaciones comerciales: nombre, teléfono, email, y en 
          caso de concretarse una compra, domicilio y número de documento, 
          requeridos para la documentación de venta.
        </p>
      </section>

      <section>
        <h2>2. Para qué usamos estos datos</h2>
        <p>
          Utilizamos tus datos exclusivamente para gestionar consultas, dar 
          seguimiento a operaciones de compra-venta, y generar la documentación 
          correspondiente (boletos de compra-venta). No compartimos tu información 
          con terceros ajenos a la operación, ni la utilizamos con fines 
          publicitarios sin tu consentimiento explícito.
        </p>
      </section>

      <section>
        <h2>3. Conservación de los datos</h2>
        <p>
          Conservamos tus datos mientras dure la relación comercial y por el plazo 
          que exija la normativa aplicable en materia de documentación de compra-venta.
        </p>
      </section>

      <section>
        <h2>4. Tus derechos</h2>
        <p>
          De acuerdo a la Ley 25.326 de Protección de Datos Personales, tenés 
          derecho a acceder, rectificar o solicitar la eliminación de tus datos 
          personales. Para ejercer estos derechos, podés contactarnos a través de 
          los medios indicados en la sección de contacto.
        </p>
      </section>

      <section>
        <h2>5. Seguridad de la información</h2>
        <p>
          Implementamos medidas de seguridad técnicas razonables para proteger tus 
          datos personales contra accesos no autorizados, pérdida o alteración.
        </p>
      </section>
    </div>
  )
}

export default PoliticaPrivacidad