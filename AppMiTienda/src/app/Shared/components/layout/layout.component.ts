import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MenuService } from '../../../Services/menu.service';
import { Menu } from '../../../Interfaces/menu';
import { UtilidadService } from '../../../Services/utilidad.service';
import { error } from 'console';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent implements OnInit {

  listaMenus: Menu[]=[];
  correoUsuario:string="";
  rolUsuario:string="";

  constructor(
    private router:Router,
    private _menuServicio:MenuService,
    private _utilidadServicio:UtilidadService){}
    
    
    ngOnInit():void{

      const usuario = this._utilidadServicio.obternerSesionUsuario();
      if(usuario !=null){
        this.correoUsuario= usuario.correo;
        this.rolUsuario = usuario.rolDescripcion;
      
        this._menuServicio.lista(usuario.idUsuario).subscribe({
          next:(data)=>{
            if(data.status)this.listaMenus=data.value;
          },
           error:()=>{
            this._utilidadServicio.showAlert("Hubo un error al completar el proceso","Opps!")
            }

          })
        }
    }




    cerrarSesion(){
      this._utilidadServicio.eliminarSesionUsuario();
        this.router.navigate(['login'])
    }
}
