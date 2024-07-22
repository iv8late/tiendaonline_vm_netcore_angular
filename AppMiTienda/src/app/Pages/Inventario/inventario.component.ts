
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Producto } from '../../Interfaces/producto';
import { ProductoService } from '../../Services/producto.service';
import { UtilidadService } from '../../Services/utilidad.service';

import { CommonModule } from '@angular/common';
import { ModalProductoComponent } from '../../Modals/modal-producto/modal-producto.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ModalProductoComponent,FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export default class InventarioComponent {
  columnasTabla: string[] = ['nombre', 'idCategoria', 'stock', 'precio', 'acciones'];
  totalStock: number = 0;
  dataInicio: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  paginaActual: number = 1;

  constructor(
    private dialog: MatDialog,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  obtenerProductos(): void {
    this._productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProductos.data = data.value;
          this.calcularTotalStock();
        } else {
          this._utilidadServicio.showAlert('No se encontraron datos', 'Oops');
        }
      },
      error: (err) => {}
    });
  }


  nuevoProducto(): void {
    this.dialog
      .open(ModalProductoComponent, {
        disableClose: true
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.obtenerProductos();
        }
      });
  }

  editarProducto(producto: Producto) {
    this.dialog
      .open(ModalProductoComponent, {
        disableClose: true,
        data: producto
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerProductos();
      });
  }

  eliminarProducto(producto: Producto): void {
    Swal.fire({
      title: '¿Deseas eliminar el producto?',
      text: producto.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productoServicio.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.showAlert('El producto fue eliminado', 'Éxito');
              this.obtenerProductos();
            } else {
              this._utilidadServicio.showAlert('No se pudo eliminar el producto', 'Oops');
            }
          },
          error: (e) => {}
        });
      }
    });
  }

  calcularTotalStock(): void {
    this.totalStock = this.dataListaProductos.data.reduce((acc, producto) => acc + (producto.stock ?? 0), 0);
  }
  
  
  aplicarFiltroTabla(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLowerCase();
  }

  paginaAnterior(): void {
    if (this.paginacionTabla.hasPreviousPage()) {
      this.paginacionTabla.previousPage();
    }
  }

  paginaSiguiente(): void {
    if (this.paginacionTabla.hasNextPage()) {
      this.paginacionTabla.nextPage();
    }
  }

  cambiarProductosPorPagina(cantidad: number): void {
    this.paginacionTabla.pageSize = cantidad;
    this.paginacionTabla.firstPage();
  }
}
