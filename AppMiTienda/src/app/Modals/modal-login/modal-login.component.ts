import { Component,OnInit,Inject} from '@angular/core';
import { ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { Usuario } from '../../Interfaces/usuario';
import { Rol } from '../../Interfaces/rol';
import { RolService } from '../../Services/rol.service';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Services/utilidad.service';
import { AuthService } from '../../Services/auth.service';

import { CommonModule } from '@angular/common';
import { MenuService } from '../../Services/menu.service';



@Component({
  selector: 'app-login-registro',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatIconModule,MatDialogModule],
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent implements OnInit {

  ocultarPassword:boolean = true; 
  listaRoles:Rol[]=[];
  formularioLogin: FormGroup;
  
  mostrarLoading: boolean = false;
  
  
  constructor(
    private modalActual:MatDialogRef<ModalLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
      private fb: FormBuilder,
      private _rolServicio: RolService,
      private _menuServicio: MenuService,
      private _usuarioServicio: UsuarioService,
      private _utilidadServicio: UtilidadService,
      private router: Router,
      private _authServicio: AuthService
      ){
   
      this.formularioLogin = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });


      

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
    const usuario = this._utilidadServicio.obternerSesionUsuario()
 
  }
 

  iniciarSesion(correo:string, clave:string) {
    
    this._authServicio.iniciarSesion(correo,clave).subscribe({
      next: (response) => {
        if (response.status) {
          this.cerrarModal();
          this.router.navigate(['/perfil']);
        } else {
          this._utilidadServicio.showAlert('Credenciales incorrectas', 'Error');
        }
      },
      error: (e) => {
        console.error('Error al iniciar sesión:', e);
        this._utilidadServicio.showAlert('Error al iniciar sesión', 'Error');
      }
    });
  }
  
  togglePasswordVisibility() {
    this.ocultarPassword = !this.ocultarPassword;
  }
}
