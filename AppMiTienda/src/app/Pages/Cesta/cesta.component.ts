import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../../Interfaces/producto';
import { Factura } from '../../Interfaces/factura';
import { FacturaService } from '../../Services/factura.service';
import { ProductoService } from '../../Services/producto.service';
import { UtilidadService } from '../../Services/utilidad.service';
import Swal from 'sweetalert2';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { DetalleFactura } from '../../Interfaces/detalle-factura';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export default class CestaComponent implements OnInit {


  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];
  listaProductosFactura: DetalleFactura[] = [];

  bloquearBotonRegistrar: boolean = false;
  productoSeleccionado!: Producto;
  tipoDePago: string = "Efectivo";
  totalPagar: number = 0;

  columnasTabla: string[] = ['producto', 'cantidad', 'precio', 'total', 'acciones'];
  formularioProductoFactura: FormGroup;
  datosDetalleFactura = new MatTableDataSource(this.listaProductosFactura);

  retornarProductosPorFiltro(busqueda: any): Producto[] {
    const valorBuscado = typeof busqueda === "string" ? busqueda.toLocaleLowerCase() : busqueda.nombre.toLocaleLowerCase();
    return this.listaProductos.filter(item => item.nombre?.toLocaleLowerCase().includes(valorBuscado));
  }

  constructor(
    private fb: FormBuilder,
    private _FacturaServicio: FacturaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService,

  ) {
    this.formularioProductoFactura = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
    });

    this._productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          const lista = data.value as Producto[];
          this.listaProductos = lista.filter(p => p.esActivo == 1 && p.stock !== undefined && p.stock > 0);
        }
      },
      error: (e) => { }
    })
    this.formularioProductoFactura.get('producto')?.valueChanges.subscribe(value => {
      this.listaProductosFiltro = this.retornarProductosPorFiltro(value);
    })

  }

  ngOnInit(): void {
  }

  mostrarProducto(producto:Producto):string{
    return producto.nombre|| 'Nombre no disponible';
  }


  productoParaFactura(event?: any) {
    this.productoSeleccionado = event.option.value;
  }

  agregarProductoParaFactura() {
    const _cantidad: number = this.formularioProductoFactura.value.cantidad;
    const _precio: number = this.productoSeleccionado?.precio ? parseFloat(this.productoSeleccionado.precio) : 0;
    const _total: number = _cantidad * _precio;
    this.totalPagar = this.totalPagar + _total;

    this.listaProductosFactura.push({
      idProducto: this.productoSeleccionado.idProducto,
      descripcionProducto: this.productoSeleccionado.nombre,
      cantidad: _cantidad,
      precioTexto: String(_precio.toFixed(2)),
      totalTexto: String(_total.toFixed(2))
    })

    this.datosDetalleFactura = new MatTableDataSource(this.listaProductosFactura)

    this.formularioProductoFactura.patchValue({
      producto: '',
      cantidad: ''
    })
  }



  eliminarProducto(detalle: DetalleFactura) {
    if (detalle.totalTexto !== undefined)
      this.totalPagar = this.totalPagar - parseFloat(detalle.totalTexto),
        this.listaProductosFactura = this.listaProductosFactura.filter(p => p.idProducto != detalle.idProducto);
    this.datosDetalleFactura = new MatTableDataSource(this.listaProductosFactura);
  }


  registrarFactura() {
    if (this.listaProductosFactura.length > 0) {
      this.bloquearBotonRegistrar = true;
      const request: Factura = {
        tipoPago: this.tipoDePago,
        totalTexto: String(this.totalPagar.toFixed(2)),
        detalleFactura: this.listaProductosFactura
      };
  
      this._FacturaServicio.registrar(request).subscribe({
        next: (response) => {
          if (response.status) {
            this.totalPagar = 0.00;
            this.listaProductosFactura = [];
            this.datosDetalleFactura = new MatTableDataSource(this.listaProductosFactura);
  
            Swal.fire({
              icon: 'success',
              title: 'Factura Registrada',
              text: `Número de Factura: ${response.value.numeroDocumento}`
            });
          } else {
            this._utilidadServicio.showAlert('No se pudo registrar la Factura', 'Oops');
          }
        },
        complete: () => {
          this.bloquearBotonRegistrar = false;
        },
        error: (e) => {}
      });
    }
  }

}
