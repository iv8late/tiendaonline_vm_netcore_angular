
import { Component,OnInit,Inject,EventEmitter} from '@angular/core';
import { ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Categoria } from '../../Interfaces/categoria';
import { CategoriaService } from '../../Services/categoria.service';
import { Producto } from '../../Interfaces/producto';
import { ProductoService } from '../../Services/producto.service';

import { UtilidadService } from '../../Services/utilidad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatIconModule,MatDialogModule],
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css'
})
export class ModalProductoComponent implements OnInit{
  formularioProducto: FormGroup;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaCategorias:Categoria[]=[];

  constructor(
    private modalActual:MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
      private fb: FormBuilder,
      private _categoriaServicio:CategoriaService,
      private _productoServicio: ProductoService,
      private _utilidadServicio: UtilidadService,
  ){

    this.formularioProducto= this.fb.group({
      nombre: ['', Validators.required],
      idCategoria: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      esActivo: ['1', Validators.required],
    });


    if(this.datosProducto!=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._categoriaServicio.lista().subscribe({
      next:(data)=>{
        if(data.status)this.listaCategorias=data.value
      },
      error:(e)=>{}
    })

  }

  ngOnInit(): void {
    if(this.datosProducto != null){
      this.formularioProducto.patchValue({
        nombre:this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        esActivo: this.datosProducto.esActivo?.toString()
      })
    }
  }
  cerrarModal() {
    this.modalActual.close();
  }

  guardarEditar_Producto() {
    const _producto: Producto = {
      idProducto: this.datosProducto == null ? 0 : this.datosProducto.idProducto,
      nombre: this.formularioProducto.value.nombre,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria:"",
      stock: this.formularioProducto.value.stock,
      precio: this.formularioProducto.value.precio,
      urlImagen: this.formularioProducto.value.urlImagen,
      descripcion:this.formularioProducto.value.descripcion,
      esActivo: parseInt(this.formularioProducto.value.esActivo),
    };

    if (this.datosProducto == null) {
      this._productoServicio.guardar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.showAlert("El producto se ha registrado", "Exito");
            this.modalActual.close("true");
            this.formularioProducto.reset();
          } else {
            this._utilidadServicio.showAlert("No se pudo registrar el producto", "Error");
          }
        },
        error: (e) => { }
      });
    } else {
      this._productoServicio.editar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.showAlert("El producto se ha editado", "Exito");
            this.modalActual.close("true");
          } else {
            this._utilidadServicio.showAlert("No se pudo editar el producto", "Error");
          }
        },
        error: (e) => { }
      });
    }
  }


}
