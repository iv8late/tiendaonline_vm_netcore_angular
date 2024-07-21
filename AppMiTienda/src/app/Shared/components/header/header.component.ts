import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog,MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../Interfaces/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { UtilidadService } from '../../../Services/utilidad.service';

import { ModalRegistroComponent } from '../../../Modals/modal-registro/modal-registro.component';
import { ModalLoginComponent } from '../../../Modals/modal-login/modal-login.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule,RouterLinkActive, RouterLink, MatDialogModule,CommonModule,ModalRegistroComponent,ReactiveFormsModule,MatIconModule,RouterLink, RouterLinkActive,RouterModule, ModalLoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  dataInicio: Usuario[] = [];
  dataListaUsuarios= new MatTableDataSource(this.dataInicio);
  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
  ) { 

    this.formularioLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {const usuario = this._utilidadServicio.obternerSesionUsuario();}

  nuevoUsuario(): void {
    this.dialog.open(ModalRegistroComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerUsuarios();
      }
    });
  }

  ingresarUsuario(): void {
    this.dialog.open(ModalLoginComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerUsuarios();
      }
    });
  }

  
  togglePasswordVisibility() {
    this.ocultarPassword = !this.ocultarPassword;
  }

  obtenerUsuarios(): void {
    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaUsuarios.data = data.value;
        } else {
          this._utilidadServicio.showAlert('No se encontraron datos', 'Oops');
        }
      },
      error: (err) => {}
    });
  }
 


  estaAutenticado():boolean{
    return this.authService.estaAutenticado();
  }

  cerrarSesion() {
   this._utilidadServicio.eliminarSesionUsuario();
   this.router.navigate(['inicio'])
  }

}
