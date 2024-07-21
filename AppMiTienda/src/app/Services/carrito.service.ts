import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carrito } from '../Interfaces/carrito';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { DetalleCarrito } from '../Interfaces/detalle-carrito';
import { DetalleFactura } from '../Interfaces/detalle-factura';
import { Factura } from '../Interfaces/factura';
import { AuthService } from './auth.service';
import { FacturaService } from './factura.service';
import { ResponseApi } from '../Interfaces/response-api';
import { map } from 'rxjs';
import { switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private storageKey = 'carrito';
  private baseUrl: string = environment.endpoint;

  // Lista carrito
  private productoscarrito: Carrito[] = [];

  // Carrito observable
  private micarrito = new BehaviorSubject<Carrito[]>([]);
  micarrito$ = this.micarrito.asObservable();

  private miDetalleFactura?: DetalleFactura;
  private miFactura = new BehaviorSubject<DetalleFactura | undefined>(undefined);
  miFactura$ = this.miFactura.asObservable();

  private http = inject(HttpClient);
  private facturaService = inject(FacturaService);
  private authService = inject(AuthService);


  constructor() { }

  nuevoCarrito(): Carrito {
    const carrito = localStorage.getItem(this.storageKey);
    return carrito ? JSON.parse(carrito) : { idCarrito: 1, idUsuario: 123, detalleCarrito: [] };
  }

  agregarProducto(item: DetalleCarrito): void {
    const carrito = this.nuevoCarrito();
    const existingItem = carrito.detalleCarrito.find(i => i.idProducto === item.idProducto);

    if (existingItem) {
      existingItem.cantidad = (existingItem.cantidad || 0) + (item.cantidad || 0);
    } else {
      carrito.detalleCarrito.push(item);
    }

    this.guardarCarrito(carrito);
  }

  removerProducto(idProducto: number): void {
    const carrito = this.nuevoCarrito();
    carrito.detalleCarrito = carrito.detalleCarrito.filter(item => item.idProducto !== idProducto);
    this.guardarCarrito(carrito);
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.storageKey);
  }

  guardarCarrito(carrito: Carrito): void {
    localStorage.setItem(this.storageKey, JSON.stringify(carrito));
  }

  facturar(factura: DetalleFactura) {
    this.miDetalleFactura = factura;
    this.miFactura.next(this.miDetalleFactura);
  }

  public get currentBill(): DetalleFactura | undefined {
    return structuredClone(this.miDetalleFactura);
  }

  totalCarrito(): number {
    const carrito = this.nuevoCarrito();
    return carrito.detalleCarrito.reduce((acc, item) => {
      const precio = parseFloat(item.precioTexto ?? '0'); 
      const cantidad = item.cantidad ?? 0; 
      return acc + (cantidad * (isNaN(precio) ? 0 : precio)); 
    }, 0);
  }
  
  
  public procesarCompra(factura: Factura): Observable<ResponseApi> {
    const authToken = localStorage.getItem('token');
  
    if (!authToken) {
      return of({ status: false, message: 'No auth token', value: null, msg: 'Authentication token is missing' });
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  
    return this.facturaService.registrar(factura).pipe(
      catchError(err => throwError(() => err.error)),
      switchMap(response => {
        if (response.status) {
         
          const carro = this.nuevoCarrito();
     
          const simulatedResponse: ResponseApi = {
            status: true,
            msg: 'Compra procesada exitosamente',
            value: carro,
           
          };
          return of(simulatedResponse);
        } else {
          return of(response);
        }
      })
    );
  }
  

  public get listaActualCarrito(): Carrito[] {
    return structuredClone(this.productoscarrito);
  }
}
