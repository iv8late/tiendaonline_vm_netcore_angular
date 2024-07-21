import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink,RouterLinkActive} from '@angular/router';
import { RouterModule } from '@angular/router';
import { Login } from '../../Interfaces/login';
import { AuthService } from '../../Services/auth.service';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Services/utilidad.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatIconModule,RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  
  
  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:  AuthService,
    private utilidadService: UtilidadService
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  iniciarSesion() {
    const loginData = this.formularioLogin.value;
    this.authService.iniciarSesion(loginData.email, loginData.password).subscribe({
      next: (response) => {
        if (response.status) {
          this.router.navigate(['/perfil']);
        } else {
          this.utilidadService.showAlert('Credenciales incorrectas', 'Error');
        }
      },
      error: (e) => {
        console.error('Error al iniciar sesión:', e);
        this.utilidadService.showAlert('Error al iniciar sesión', 'Error');
      }
    });
  }

  redirectToIndex() {
    this.router.navigate(['/']);
  }

  togglePasswordVisibility() {
    this.ocultarPassword = !this.ocultarPassword;
  }
}
