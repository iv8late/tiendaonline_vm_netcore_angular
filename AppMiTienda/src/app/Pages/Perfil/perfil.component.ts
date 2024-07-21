import { Component,OnInit } from '@angular/core';
import { Sesion } from '../../Interfaces/sesion';
import { UtilidadService } from '../../Services/utilidad.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export default class PerfilComponent implements OnInit {
  usuario: Sesion | null = null;

  constructor(private _utilidadServicio: UtilidadService,
   
  ) {}

  ngOnInit(): void {
    this.usuario = this._utilidadServicio.obternerSesionUsuario();
  }




}
