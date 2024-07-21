import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Producto } from '../../Interfaces/producto';
import { ProductoService } from '../../Services/producto.service';
import { Categoria } from '../../Interfaces/categoria';
import { CategoriaService } from '../../Services/categoria.service';
import { UtilidadService } from '../../Services/utilidad.service';

import { CarritoService } from '../../Services/carrito.service';
import { ModalCarritoComponent } from '../../Modals/modal-carrito/modal-carrito.component';

import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { DetalleCarrito } from '../../Interfaces/detalle-carrito';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,ModalCarritoComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export default class ProductosComponent implements OnInit {
  @ViewChild('cartSidebar') carrito?: ModalCarritoComponent;
  categorias:Categoria[]=[];
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada = '';
  test: boolean= false;

  dataListaProductosFiltrados = new MatTableDataSource(this.productosFiltrados);
  dataListaProductos = new MatTableDataSource<Producto>(this.productos);

  constructor(
    private router: Router,
    private _carritoService: CarritoService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService,
    private _categoriaServicio: CategoriaService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  agregarAlCarrito(producto: DetalleCarrito) {
    this._carritoService.agregarProducto(producto);
  }

  verCarrito() {
    this.carrito?.openNav();
  }

  obtenerCategorias(): void {
    this._categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.categorias = data.value;
          if (this.categorias.length > 0) {
            this.categoriaSeleccionada = this.categorias[0].nombre;
          
            this.obtenerProductosPorCategoria(this.categoriaSeleccionada);
          }
        } else {
          this._utilidadServicio.showAlert('No se encontraron categorías', 'Oops');
        }
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }


  obtenerProductos(): void {
    this._productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.productos=data.value;
          this.dataListaProductos.data = this.productos;
        } else {
          this._utilidadServicio.showAlert('No se encontraron datos', 'Oops');
        }
      },
      error: (err) => {}
    });
  }

  obtenerProductosPorCategoria(categoria: string): void {
    this._categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.productosFiltrados = data.value.filter((producto: Producto) => {  // Type assertion
            return producto.descripcionCategoria === categoria;});
          this.dataListaProductos.data = this.productosFiltrados;
        } else {
          this._utilidadServicio.showAlert('No se encontraron datos', 'Oops');
        }
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

 

 

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.obtenerProductosPorCategoria(categoria);
  }

  mostrarDetallesProducto(producto: Producto): void {
    Swal.fire({
      title: producto.nombre,
      html: `
        <img src="${producto.urlImagen}" alt="${producto.nombre}" style="width: 100px; height: 100px;">
        <p>${producto.descripcion}</p>
        <p><strong>Precio:</strong> $${producto.precio}</p>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Comprar',
      cancelButtonText: 'Cerrar',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      stopKeydownPropagation: false 
      
    }).then((result) => {
        if (result.isConfirmed) {
          this.test=true;
          Swal.stopTimer
          this.router.navigate(['/productos']);
          
    }
  }).catch((error) => {
    this.router.navigate(['/productos']);
    
  });
      
    
    
  }
  filtrarProductosPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.productosFiltrados = this.productos.filter(producto => producto.descripcionCategoria === categoria);
  }
}


