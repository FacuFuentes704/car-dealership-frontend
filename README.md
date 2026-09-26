# LGi Motors — Frontend

Interfaz del sistema de gestión de LGi Motors, una agencia de autos de Venado Tuerto. Consume la API que desarrollé en FastAPI ([repo del backend](https://github.com/FacuFuentes704/Car-Dealership)).

**En producción:** [lgimotors.com](https://lgimotors.com)

## Qué incluye

- Catálogo público con búsqueda y filtros, páginas de 0KM, usados y ofertas
- Detalle de cada vehículo con galería de fotos y contacto por WhatsApp
- Panel de administración protegido con login (JWT): vehículos, clientes, ventas, intereses y boleto de compra-venta imprimible
- Modo claro / oscuro

## Tecnologías

React 19, Vite, React Router y `fetch` nativo. Desplegado en Vercel.

## Correrlo localmente

```bash
npm install
npm run dev
```

Queda disponible en `http://localhost:5173`.
