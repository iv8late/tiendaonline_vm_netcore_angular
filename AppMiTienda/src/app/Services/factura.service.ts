import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Injectable } from '@angular/core';
import { Factura } from '../Interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private urlApi: string = `${environment.endpoint}Factura/`;

  constructor(private http: HttpClient) { }

  registrar(request: Factura): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request);
  }

  historial(buscarPor: string, numeroFactura: string, fechaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Historial?buscarPor=${buscarPor}&numeroFactura=${numeroFactura}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

}

