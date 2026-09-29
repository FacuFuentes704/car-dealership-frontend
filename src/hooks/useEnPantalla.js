import { useState, useEffect, useRef } from 'react'

function useEnPantalla() {
  const [visible, setVisible] = useState(false)
  const elementoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )

    if (elementoRef.current) {
      observer.observe(elementoRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return [elementoRef, visible]
}

export default useEnPantalla