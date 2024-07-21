import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sesion } from '../Interfaces/sesion';
import { UtilidadService } from './utilidad.service';
import { UsuarioService } from './usuario.service';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActualSujeto: BehaviorSubject<Sesion | null>;
  public usuarioActual: Observable<Sesion | null>;

  constructor(
    private usuarioService: UsuarioService,
    private utilidadService: UtilidadService
  ) {
    this.usuarioActualSujeto = new BehaviorSubject<Sesion | null>(this.utilidadService.obternerSesionUsuario());
    this.usuarioActual = this.usuarioActualSujeto.asObservable();
  }

  public get usuarioActualValue(): Sesion | null {
    return this.usuarioActualSujeto.value;
  }

  iniciarSesion(email: string, password: string): Observable<ResponseApi> {
    return this.usuarioService.iniciarSesion({ correo:email, clave:password }).pipe(
      map(response => {
        if (response.status) {
          this.utilidadService.guardarSesionUsuario(response.value);
          this.usuarioActualSujeto.next(response.value);
        }
        return response;
      })
    );
  }

  cerrarSesion() {
    this.utilidadService.eliminarSesionUsuario();
    this.usuarioActualSujeto.next(null);
  }

  estaAutenticado(): boolean {
    return this.usuarioActualSujeto.value !== null;
  }
}
