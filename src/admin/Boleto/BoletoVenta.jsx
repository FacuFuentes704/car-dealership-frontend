import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL } from '../../config'
import { fetchConToken } from '../../utils/fetchConToken'
import './BoletoVenta.css'

function BoletoVenta() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [venta, setVenta] = useState(null)
  const [agencia, setAgencia] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  const [datosExtra, setDatosExtra] = useState({
    engine_number: "",
    chassis_number: "",
    client_address: "",
    client_locality: "",
    client_document_number: "",
    reserva_amount: "",
    entrega_amount: "",
    otros_amount: "",
    saldo_financiado: "",
    cantidad_cuotas: "",
    monto_cuota: "",
    fecha_primera_cuota: ""
  })

  useEffect(() => {
    Promise.all([
      fetchConToken(`${API_URL}/sales/${id}`).then(res => res.json()),
      fetchConToken(`${API_URL}/company-settings/`).then(res => res.json())
    ])
      .then(([ventaData, agenciaData]) => {
        setVenta(ventaData)
        setAgencia(agenciaData)
        setDatosExtra({
          engine_number: ventaData.vehicle.engine_number || "",
          chassis_number: ventaData.vehicle.chassis_number || "",
          client_address: ventaData.client.address || "",
          client_locality: ventaData.client.locality || "",
          client_document_number: ventaData.client.document_number || "",
          reserva_amount: ventaData.reserva_amount || "",
          entrega_amount: ventaData.entrega_amount || "",
          otros_amount: ventaData.otros_amount || "",
          saldo_financiado: ventaData.saldo_financiado || "",
          cantidad_cuotas: ventaData.cantidad_cuotas || "",
          monto_cuota: ventaData.monto_cuota || "",
          fecha_primera_cuota: ventaData.fecha_primera_cuota ? ventaData.fecha_primera_cuota.split("T")[0] : ""
        })
        setCargando(false)
      })
      .catch(() => {
        setError("No se pudo cargar el boleto")
        setCargando(false)
      })
  }, [id])

  function manejarCambio(campo, valor) {
    setDatosExtra({ ...datosExtra, [campo]: valor })
  }

  function guardarYMarcar() {
    setGuardando(true)

    Promise.all([
      fetchConToken(`${API_URL}/vehicles/${venta.vehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engine_number: datosExtra.engine_number || null,
          chassis_number: datosExtra.chassis_number || null
        })
      }),
      fetchConToken(`${API_URL}/clients/${venta.client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: datosExtra.client_address || null,
          locality: datosExtra.client_locality || null,
          document_number: datosExtra.client_document_number || null
        })
      }),
      fetchConToken(`${API_URL}/sales/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boleto_generado: true,
          reserva_amount: datosExtra.reserva_amount ? Number(datosExtra.reserva_amount) : null,
          entrega_amount: datosExtra.entrega_amount ? Number(datosExtra.entrega_amount) : null,
          otros_amount: datosExtra.otros_amount ? Number(datosExtra.otros_amount) : null,
          saldo_financiado: datosExtra.saldo_financiado ? Number(datosExtra.saldo_financiado) : null,
          cantidad_cuotas: datosExtra.cantidad_cuotas ? Number(datosExtra.cantidad_cuotas) : null,
          monto_cuota: datosExtra.monto_cuota ? Number(datosExtra.monto_cuota) : null,
          fecha_primera_cuota: datosExtra.fecha_primera_cuota || null
        })
      })
    ])
      .then(() => {
        setGuardando(false)
        window.print()
      })
      .catch(() => {
        setError("No se pudo guardar")
        setGuardando(false)
      })
  }

  if (cargando) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="boleto-contenedor">
      <div className="boleto-acciones no-imprimir">
        <button onClick={() => navigate(`/admin/ventas/${id}/ver`)}>← Volver</button>
        <button onClick={guardarYMarcar} disabled={guardando} className="boton-guardar">
          {guardando ? "Guardando..." : "Guardar e Imprimir"}
        </button>
      </div>

      <div className="boleto">
        <h1 className="boleto-titulo">CERTIFICADO DE VENTA Y/O PERMUTA</h1>

        <p className="boleto-parrafo">
          Entre la firma <strong>{agencia.business_name}</strong>, en adelante vendedor, y el
        </p>
        <p className="boleto-parrafo">
          Sr.: <strong>{venta.client.name}</strong>, en adelante comprador,
        </p>
        <p className="boleto-parrafo">se conviene el siguiente contrato:</p>

        <p className="boleto-clausula">
          <strong>PRIMERO:</strong> El vendedor entrega al comprador un:
        </p>

        <table className="boleto-tabla">
          <tbody>
            <tr>
              <td className="boleto-label">MARCA:</td>
              <td>{venta.vehicle.brand}</td>
              <td className="boleto-label">MODELO:</td>
              <td>{venta.vehicle.model}</td>
            </tr>
            <tr>
              <td className="boleto-label">AÑO:</td>
              <td>{venta.vehicle.year}</td>
              <td className="boleto-label">MOTOR:</td>
              <td>
                <input
                  className="boleto-input no-imprimir"
                  value={datosExtra.engine_number}
                  onChange={(e) => manejarCambio("engine_number", e.target.value)}
                />
                <span className="solo-imprimir">{datosExtra.engine_number}</span>
              </td>
            </tr>
            <tr>
              <td className="boleto-label">CHASIS N°:</td>
              <td>
                <input
                  className="boleto-input no-imprimir"
                  value={datosExtra.chassis_number}
                  onChange={(e) => manejarCambio("chassis_number", e.target.value)}
                />
                <span className="solo-imprimir">{datosExtra.chassis_number}</span>
              </td>
              <td className="boleto-label">DOMINIO:</td>
              <td>{venta.vehicle.plate || "-"}</td>
            </tr>
          </tbody>
        </table>

        <p className="boleto-texto">
          en el estado en que se encuentra, y que el comprador declara conocer; y ser de su aceptación.
          Las unidades usadas no reconocen garantías por parte del vendedor, debiendo las mismas ser
          examinadas, mediante un técnico al momento de la operación – Posterior a la conformidad
          expresa de las partes en este contrato, el vendedor queda eximido de toda responsabilidad,
          no pudiendo efectuarse reclamo alguno en carácter de garantía.
        </p>

        <p className="boleto-clausula">
          <strong>SEGUNDO:</strong> El comprador abona el precio de la venta de la siguiente manera:
        </p>

        <table className="boleto-tabla boleto-tabla-pago">
          <tbody>
            <tr>
              <td>CONTADO: Valor tomado por reserva unidad</td>
              <td>
                $ <input
                  type="number"
                  className="boleto-input no-imprimir"
                  value={datosExtra.reserva_amount}
                  onChange={(e) => manejarCambio("reserva_amount", e.target.value)}
                />
                <span className="solo-imprimir">
                  {datosExtra.reserva_amount ? Number(datosExtra.reserva_amount).toLocaleString('es-AR') : "-"}
                </span>
              </td>
            </tr>
            <tr>
              <td>ENTREGA EFECTIVO C/ENTREGA UNIDAD:</td>
              <td>
                $ <input
                  type="number"
                  className="boleto-input no-imprimir"
                  value={datosExtra.entrega_amount}
                  onChange={(e) => manejarCambio("entrega_amount", e.target.value)}
                />
                <span className="solo-imprimir">
                  {datosExtra.entrega_amount ? Number(datosExtra.entrega_amount).toLocaleString('es-AR') : "-"}
                </span>
              </td>
            </tr>
            <tr>
              <td>OTROS:</td>
              <td>
                $ <input
                  type="number"
                  className="boleto-input no-imprimir"
                  value={datosExtra.otros_amount}
                  onChange={(e) => manejarCambio("otros_amount", e.target.value)}
                />
                <span className="solo-imprimir">
                  {datosExtra.otros_amount ? Number(datosExtra.otros_amount).toLocaleString('es-AR') : "-"}
                </span>
              </td>
            </tr>
            <tr>
              <td>SALDO A PAGAR FINANCIADO:</td>
              <td>
                $ <input
                  type="number"
                  className="boleto-input no-imprimir"
                  value={datosExtra.saldo_financiado}
                  onChange={(e) => manejarCambio("saldo_financiado", e.target.value)}
                />
                <span className="solo-imprimir">
                  {datosExtra.saldo_financiado ? Number(datosExtra.saldo_financiado).toLocaleString('es-AR') : "-"}
                </span>
              </td>
            </tr>
            <tr>
              <td><strong>TOTAL:</strong></td>
              <td><strong>${Number(venta.sale_price).toLocaleString('es-AR')}</strong></td>
            </tr>
          </tbody>
        </table>

        <p className="boleto-clausula">
          <strong>TERCERO:</strong> El saldo financiado será abonado de la siguiente manera, en{" "}
          <input
            type="number"
            className="boleto-input-inline no-imprimir"
            value={datosExtra.cantidad_cuotas}
            onChange={(e) => manejarCambio("cantidad_cuotas", e.target.value)}
          />
          <span className="solo-imprimir">{datosExtra.cantidad_cuotas || "................"}</span>
          {" "}cuotas iguales mensuales y consecutivas de $
          <input
            type="number"
            className="boleto-input-inline no-imprimir"
            value={datosExtra.monto_cuota}
            onChange={(e) => manejarCambio("monto_cuota", e.target.value)}
          />
          <span className="solo-imprimir">
            {datosExtra.monto_cuota ? Number(datosExtra.monto_cuota).toLocaleString('es-AR') : "................"}
          </span>
          {" "}pesos cada una, con vencimiento a partir del{" "}
          <input
            type="date"
            className="boleto-input-inline no-imprimir"
            value={datosExtra.fecha_primera_cuota}
            onChange={(e) => manejarCambio("fecha_primera_cuota", e.target.value)}
          />
          <span className="solo-imprimir">
            {datosExtra.fecha_primera_cuota
              ? new Date(datosExtra.fecha_primera_cuota).toLocaleDateString('es-AR')
              : "................"}
          </span>
          {" "}inclusive y en adelante, con más los intereses y punitorios que fije la firma, para pagos
          fuera de término.
        </p>

        <p className="boleto-clausula">
          <strong>CUARTO:</strong> El comprador se compromete a efectuar el trámite de transferencia
          del dominio de la unidad a su nombre, el que será gestionado en esta firma, siendo esta
          cláusula decisiva para el retiro de la unidad adquirida, siendo a su exclusivo cargo gastos
          por todo concepto que esta demande. Para el caso de las operaciones con entrega de vehículos
          usados en canje, también deberá cumplir con la entrega total de la documentación del mismo,
          según se le exija.
        </p>

        <p className="boleto-clausula">
          <strong>QUINTO:</strong> El comprador se hace cargo desde la fecha de este contrato, de
          cualquier importe o gasto que pudiere resultar por accidente y/o eventos dañosos que se
          ocasionasen a terceros con o por mediación del vehículo adquirido.
        </p>

        <p className="boleto-clausula">
          <strong>SEXTO:</strong> La falta de pago de dos cuotas consecutivas hace rescindir este
          contrato en forma automática quedando el comprador obligado a hacer entrega al vendedor de
          la unidad vendida, quedando como compensación convencionalmente establecida, de daños y
          perjuicios, todas las sumas que pudiera haber entregado a cuenta.
        </p>

        <p className="boleto-clausula">
          <strong>SÉPTIMO:</strong> Así también la falta de cumplimiento de todas o cada una de las
          obligaciones contraídas en esta otorga derecho al vendedor a pedir la rescisión del contrato.
        </p>

        <p className="boleto-clausula">
          <strong>OCTAVO:</strong> Para cuestiones judiciales o extrajudiciales que pudieren surgir al
          motivo de esta venta, las partes convienen someterse a la jurisdicción de los tribunales
          ordinarios de la ciudad de Venado Tuerto, renunciando a cualquier otro que pudiera
          corresponder, inclusive el federal.
        </p>

        <p className="boleto-clausula">
          <strong>NOVENO:</strong> En prueba de conformidad se firman dos ejemplares de un mismo tenor
          y solo efecto, en la ciudad de Venado Tuerto, a los{" "}
          {venta.sale_date
            ? new Date(venta.sale_date).getDate()
            : new Date(venta.created_at).getDate()}{" "}
          días del mes de{" "}
          {new Date(venta.sale_date || venta.created_at).toLocaleDateString('es-AR', { month: 'long' })}{" "}
          del año {new Date(venta.sale_date || venta.created_at).getFullYear()}.
        </p>

        <div className="boleto-firmas">
          <div className="boleto-firma">
            <div className="boleto-linea-firma"></div>
            <p>FIRMA</p>
          </div>
          <div className="boleto-firma">
            <div className="boleto-linea-firma"></div>
            <p>FIRMA</p>
          </div>
        </div>

        <table className="boleto-tabla boleto-tabla-partes">
          <thead>
            <tr>
              <th>COMPRADOR</th>
              <th>VENDEDOR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nombre y Apellido: {venta.client.name}</td>
              <td>Nombre y Apellido: {agencia.business_name}</td>
            </tr>
            <tr>
              <td>
                Domicilio:{" "}
                <input
                  className="boleto-input no-imprimir"
                  value={datosExtra.client_address}
                  onChange={(e) => manejarCambio("client_address", e.target.value)}
                />
                <span className="solo-imprimir">{datosExtra.client_address}</span>
              </td>
              <td>Domicilio: {agencia.address || "-"}</td>
            </tr>
            <tr>
              <td>
                Localidad:{" "}
                <input
                  className="boleto-input no-imprimir"
                  value={datosExtra.client_locality}
                  onChange={(e) => manejarCambio("client_locality", e.target.value)}
                />
                <span className="solo-imprimir">{datosExtra.client_locality}</span>
              </td>
              <td>Localidad: {agencia.locality || "-"}</td>
            </tr>
            <tr>
              <td>
                Documento:{" "}
                <input
                  className="boleto-input no-imprimir"
                  value={datosExtra.client_document_number}
                  onChange={(e) => manejarCambio("client_document_number", e.target.value)}
                />
                <span className="solo-imprimir">{datosExtra.client_document_number}</span>
              </td>
              <td>Documento: {agencia.document_number || "-"}</td>
            </tr>
            <tr>
              <td>Teléfono: {venta.client.phone || "-"}</td>
              <td>Teléfono: {agencia.phone || "-"}</td>
            </tr>
          </tbody>
        </table>

        <p className="boleto-observaciones">
          Observaciones: {venta.observaciones || "..................................................."}
        </p>
      </div>
    </div>
  )
}

export default BoletoVenta