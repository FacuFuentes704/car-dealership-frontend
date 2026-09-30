import { useState, useEffect, useRef } from 'react'
import './BuscadorSelector.css'

// Selector con buscador. Reemplaza a un <select> nativo cuando la lista
// puede tener muchos items o nombres repetidos: en vez de scrollear un
// dropdown gigante, el usuario escribe y filtra.
//
// items: array de objetos a elegir
// getId(item): valor único de cada item (lo que se guarda en el form)
// getLabel(item): texto que se muestra en la lista y en el input al elegir
// value: id seleccionado actualmente (controlado, como un <select>)
// onChange(id): se llama al elegir un item
function BuscadorSelector({ items, getId, getLabel, value, onChange, placeholder }) {
  const [texto, setTexto] = useState('')
  const [abierto, setAbierto] = useState(false)
  const contenedorRef = useRef(null)

  useEffect(() => {
    if (!value) {
      setTexto('')
      return
    }
    const seleccionado = items.find((item) => String(getId(item)) === String(value))
    if (seleccionado) setTexto(getLabel(seleccionado))
  }, [value, items])

  useEffect(() => {
    function manejarClickAfuera(e) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
        setAbierto(false)
      }
    }
    document.addEventListener('mousedown', manejarClickAfuera)
    return () => document.removeEventListener('mousedown', manejarClickAfuera)
  }, [])

  const textoBusqueda = texto.trim().toLowerCase()
  const coincidencias = textoBusqueda === ''
    ? items
    : items.filter((item) => getLabel(item).toLowerCase().includes(textoBusqueda))

  function seleccionar(item) {
    onChange(getId(item))
    setTexto(getLabel(item))
    setAbierto(false)
  }

  function manejarCambioTexto(e) {
    setTexto(e.target.value)
    setAbierto(true)
    if (value) onChange("")
  }

  return (
    <div className="buscador-selector" ref={contenedorRef}>
      <input
        type="text"
        value={texto}
        onChange={manejarCambioTexto}
        onFocus={() => setAbierto(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {abierto && (
        <ul className="buscador-selector-lista">
          {coincidencias.length === 0 ? (
            <li className="buscador-selector-vacio">Sin resultados</li>
          ) : (
            coincidencias.slice(0, 50).map((item) => (
              <li key={getId(item)} onMouseDown={() => seleccionar(item)}>
                {getLabel(item)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default BuscadorSelector
