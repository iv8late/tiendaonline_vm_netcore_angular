import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi, ResponseApi1 } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi: string = `${environment.endpoint}Categoria/`;

  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi1> {
    return this.http.get<ResponseApi1>(`${this.urlApi}Lista`);
  }
}
