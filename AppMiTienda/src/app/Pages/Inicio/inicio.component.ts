import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { ProductoService } from '../../Services/producto.service';
import { Producto } from '../../Interfaces/producto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.buscarProductos([1, 2, 3, 4]);
  }

  buscarProductos(ids: number[]): void {
    const requests = ids.map(id => this.productoService.buscarPorId(id));
    forkJoin(requests).subscribe({
      next: (results) => {
        this.productos = results.map(result => result.value);
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
      }
    });
  
}
}
