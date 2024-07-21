import { Component,Inject,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Carrito } from '../../Interfaces/carrito';
import { CarritoService } from '../../Services/carrito.service';
@Component({
  selector: 'app-modal-carrito',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.css']
})
export class ModalCarritoComponent implements OnInit {

  carrito!: Carrito;

  constructor(
    public dialogRef: MatDialogRef<ModalCarritoComponent>,
    private _carritoService: CarritoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.carrito = this._carritoService.nuevoCarrito();
  }

  openNav() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.style.width = "250px";
    }
}

closeNav() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.style.width = "0";
    }
}


  close(): void {
    this.dialogRef.close();
  }
}
