import { Injectable } from '@angular/core';
import { Sesion } from '../Interfaces/sesion';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {
    constructor(private toastr: ToastrService) {}

    showAlert(message: string, tipo: string) {
      this.toastr.show(message, tipo, {
        positionClass: 'toast-top-right', 
        timeOut: 3000 
      });
    }
    guardarSesionUsuario(usuarioSesion:Sesion){
        localStorage.setItem("usuario",JSON.stringify(usuarioSesion))
    }
    obternerSesionUsuario(){
        const dataCadena = localStorage.getItem("usuario");
        const usuario= JSON.parse(dataCadena!)
        return usuario
    }

    eliminarSesionUsuario(){
        localStorage.removeItem("usuario")
    }
}

