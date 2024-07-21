
import { Component, OnInit,} from '@angular/core';
import { MatDialog,MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

import { Usuario } from '../../Interfaces/usuario';

import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Services/utilidad.service';

import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ModalRegistroComponent } from '../../Modals/modal-registro/modal-registro.component';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink,MatDialogModule,RouterLinkActive, ModalRegistroComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export default class RegistroComponent implements OnInit{

  dataInicio: Usuario[] = [];
  dataListaUsuarios= new MatTableDataSource(this.dataInicio);

  
  constructor(
    
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
  ) { }
      
  

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  nuevoUsuario(): void {
    this.dialog.open(ModalRegistroComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerUsuarios();
      }
    });
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
 

}
