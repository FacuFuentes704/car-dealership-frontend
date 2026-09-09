import TarjetaVehiculo from "./TarjetaVehiculo";

function PanelDeVehiculos() {
const vehiculos = [{
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    year: 2026,
    km: 2000,
    precio: 30000
},
{
    id: 2,
    marca: "Ford",
    modelo: "Focus",
    year: 2026,
    km: 2000,
    precio: 4000
}]

    return (
        <div>
            {vehiculos.map((vehiculo) => (
                <TarjetaVehiculo 
                id = {vehiculo.id}
                year = {vehiculo.year}
                precio = {vehiculo.precio}
                km = {vehiculo.km}
                marca = {vehiculo.marca} 
                modelo = {vehiculo.modelo} />
            ))}
        </div>
    )
    }

export default PanelDeVehiculos