import { Component,OnInit,Inject} from '@angular/core';
import { ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Usuario } from '../../Interfaces/usuario';
import { Rol } from '../../Interfaces/rol';
import { RolService } from '../../Services/rol.service';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Services/utilidad.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-modal-registro',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatIconModule,MatDialogModule],
  templateUrl: './modal-registro.component.html',
  styleUrl: './modal-registro.component.css'
})
export class ModalRegistroComponent implements OnInit {

  formularioUsuario: FormGroup;
  ocultarPassword:boolean = true; 
  tituloAccion:string = "Registrar";
  botonAccion:string = "Registrar";
  listaRoles:Rol[]=[];
  
  
  constructor(
    private modalActual:MatDialogRef<ModalRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
      private fb: FormBuilder,
      private _rolServicio: RolService,
      private _usuarioServicio: UsuarioService,
      private _utilidadServicio: UtilidadService,
      ){
      this.formularioUsuario = this.fb.group({
        nombreCompleto: ['', Validators.required],
        cedula: ['', Validators.required],
        correo: ['', Validators.required],
        idRol: ['2', Validators.required],
        rolDescripcion: ['Cliente', Validators.required],
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
        cedula:this.formularioUsuario.value.cedula,
        correo: this.datosUsuario.correo,
        idRol: this.datosUsuario.idRol,
        rolDescripcion:this.datosUsuario.rolDescripcion,
        clave: this.datosUsuario.clave,
        estado: this.datosUsuario.estado?.toString()
      })
    }
  }
 
  registrarUsuario() {
    const _usuario: Usuario = {
      idUsuario: this.datosUsuario == null ? 0 : this.datosUsuario.idUsuario,
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      cedula:this.formularioUsuario.value.cedula,
      correo: this.formularioUsuario.value.correo,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: this.formularioUsuario.value.rolDescripcion,
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
    }
  }
  
  togglePasswordVisibility() {
    this.ocultarPassword = !this.ocultarPassword;
  }
}
