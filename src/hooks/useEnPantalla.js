import { useState, useEffect, useRef } from 'react'

function useEnPantalla() {
  const [visible, setVisible] = useState(false)
  const elementoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        setVisible(entradas[0].isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (elementoRef.current) {
      observer.observe(elementoRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return [elementoRef, visible]
}

export default useEnPantalla