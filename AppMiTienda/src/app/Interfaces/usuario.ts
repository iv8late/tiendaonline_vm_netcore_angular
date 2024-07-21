export interface Usuario {
    idUsuario: number;
    nombreCompleto: string;
    cedula: string;
    correo?: string;
    idRol?: number;
    rolDescripcion?:string,
    clave?: string;
    esActivo?: number;

}
