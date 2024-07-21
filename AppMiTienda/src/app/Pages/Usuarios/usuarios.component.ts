
import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog,MatDialogModule} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';


import { Usuario } from '../../Interfaces/usuario';
import { UsuarioService } from '../../Services/usuario.service';
import { UtilidadService } from '../../Services/utilidad.service';

import { CommonModule } from '@angular/common';
import { ModalUsuarioComponent } from '../../Modals/modal-usuario/modal-usuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,ModalUsuarioComponent,MatPaginatorModule,MatDialogModule,MatTableModule],
  templateUrl:'./usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export  default class UsuariosComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = ['nombreCompleto', 'correo', 'rolDescripcion', 'estado', 'acciones'];
  dataInicio: Usuario[] = [];
  dataListaUsuarios= new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator

  
  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
    
  ) { }
 
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator=this.paginacionTabla;
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

  aplicarFiltroTabla(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  nuevoUsuario(): void {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerUsuarios();
      }
    });
  }

  editarUsuario(usuario:Usuario){
    this.dialog.open(ModalUsuarioComponent,{
      disableClose:true,
      data:usuario
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="true")this.obtenerUsuarios();
    })
  }

 
  eliminarUsuario(usuario: Usuario): void {
    Swal.fire({
      title: '¿Deseas eliminar el usuario?',
      text: usuario.nombreCompleto,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.showAlert('El usuario fue eliminado', 'Éxito');
              this.obtenerUsuarios();
            } else {
              this._utilidadServicio.showAlert('No se pudo eliminar el usuario', 'Oops');
            }
          },
          error: (e) => {}
        });
      }
    });
  }
}
