import { DetalleCarrito } from "./detalle-carrito";
export interface Carrito {
    idCarrito: number,
    idUsuario:number,
    detalleCarrito: DetalleCarrito[]
}
    