
import { DetalleFactura } from "./detalle-factura"
export interface Factura {
    idFactura?: number
    numeroDocumento?: string,
    tipoPago: string,
    fechaRegistro?: string,
    totalTexto: string,
    detalleFactura: DetalleFactura[]
}