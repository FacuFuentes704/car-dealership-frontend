import { useEffect } from 'react'

function useTitulo(titulo) {
  useEffect(() => {
    document.title = `${titulo} - LGi Motors`
  }, [titulo])
}

export default useTitulo