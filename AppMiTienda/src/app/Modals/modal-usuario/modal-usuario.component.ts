import { Component,OnInit,Inject,EventEmitter} from '@angular/core';
import { ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Usuario } from '../../Interfaces/usuario';
import { Rol } from '../../Interfaces/rol';
import { RolService } from '../../Services/rol.service';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Services/utilidad.service';

import { CommonModule } from '@angular/common';
// import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatIconModule,MatDialogModule],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent implements OnInit {

  formularioUsuario: FormGroup;
  ocultarPassword:boolean = true; 
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaRoles:Rol[]=[];
  
  
  constructor(
    private modalActual:MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
      private fb: FormBuilder,
      private _rolServicio: RolService,
      private _usuarioServicio: UsuarioService,
      private _utilidadServicio: UtilidadService,
      ){
      this.formularioUsuario = this.fb.group({
        nombreCompleto: ['', Validators.required],
        correo: ['', Validators.required],
        idRol: ['', Validators.required],
        clave: ['', Validators.required],
        estado: ['1', Validators.required],
      });


      if(this.datosUsuario!=null){
        this.tituloAccion="Editar";
        this.botonAccion="Actualizar";
      }

      this._rolServicio.lista().subscribe({
        next:(data)=>{
          if(data.status)this.listaRoles=data.value
        },
        error:(e)=>{}
      })
  }
  cerrarModal() {
    this.modalActual.close();
  }
  
  
  ngOnInit():void{
    if(this.datosUsuario != null){
      this.formularioUsuario.patchValue({
        nombreCompleto:this.datosUsuario.nombreCompleto,
        correo: this.datosUsuario.correo,
        idRol: this.datosUsuario.idRol,
        clave: this.datosUsuario.clave,
        estado: this.datosUsuario.estado?.toString()
      })
    }
  }
 
  guardarEditar_Usuario() {
    const _usuario: Usuario = {
      idUsuario: this.datosUsuario == null ? 0 : this.datosUsuario.idUsuario,
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      cedula:this.datosUsuario.cedula,
      correo: this.formularioUsuario.value.correo,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: "",
      clave: this.formularioUsuario.value.clave,
      estado: parseInt(this.formularioUsuario.value.estado),
    };
  
    if (this.datosUsuario == null) {
      this._usuarioServicio.guardar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.showAlert("El usuario se ha registrado", "Exito");
            this.modalActual.close("true");
            this.formularioUsuario.reset();
          } else {
            this._utilidadServicio.showAlert("No se pudo registrar el usuario", "Error");
          }
        },
        error: (e) => { }
      });
    } else {
      this._usuarioServicio.editar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.showAlert("El usuario se ha editado", "Exito");
            console.log("guardarEditar_Usuario called");
            this.modalActual.close("true");
          } else {
            this._utilidadServicio.showAlert("No se pudo editar el usuario", "Error");
          }
        },
        error: (e) => { }
      });
    }
  }
  


  togglePasswordVisibility() {
    this.ocultarPassword = !this.ocultarPassword;
  }
}
