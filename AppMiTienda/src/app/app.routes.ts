import { Routes } from '@angular/router';

export const routes: Routes = [
// {
//     path: '',
//     loadComponent: () => import('./Pages/Inicio/inicio.component')

// }
{
    path: '',
    loadComponent: () => import('./Shared/components/layout/layout.component')

    ,children: [
        {
            path: 'inicio',
            loadComponent: () => import('./Pages/Inicio/inicio.component')
        },
        {
            path: '',
            redirectTo: 'inicio',
            pathMatch: 'full'
          },
        {
            path: 'historial',
            loadComponent: () => import('./Pages/Historial/historial.component')
        },
        {
            path: 'productos',
            loadComponent: () => import('./Pages/Productos/productos.component')
    
        },
        {
            path: 'perfil',
            loadComponent: () => import('./Pages/Perfil/perfil.component')
    
        },
        {
            path: 'usuarios',
            loadComponent: () => import('./Pages/Usuarios/usuarios.component')
        },
        {
            path: 'cesta',
            loadComponent: () => import('./Pages/Cesta/cesta.component')
        },
        {
            path: 'registro',
            loadComponent: () => import('./Pages/Registro/registro.component')
        },
    ]
    },
    {
        path: 'login',
        loadComponent: () => import('./Pages/Login/login.component')
    },
   

    
    {
    path: '**',
    redirectTo: 'inicio'
    },

    

    
];
