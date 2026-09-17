export function fetchConToken(url, opciones = {}) {
  const token = localStorage.getItem("token")

  return fetch(url, {
    ...opciones,
    headers: {
      ...opciones.headers,
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    if (res.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
      throw new Error("Sesión expirada")
    }
    return res
  })
}