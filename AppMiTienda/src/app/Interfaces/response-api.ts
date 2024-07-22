import { Categoria } from "./categoria"

import { Usuario } from "./usuario"

export interface ResponseApi {
    status: boolean,
    msg: string,
    value: any
}

export interface ResponseApi1 {
    status: boolean,
    msg: string,
    value: Categoria[]
}


export interface ResponseApi2 {
    status: boolean,
    msg: string,
    value: Usuario
}
