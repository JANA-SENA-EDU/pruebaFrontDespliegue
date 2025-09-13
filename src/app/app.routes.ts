import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { IndexComponent } from './pages/index/index.component'; // 👈 importamos el index
import { RegisterComponent } from './auth/pages/register/register.component'; 

export const routes: Routes = [
    { path: '', component: IndexComponent }, // 👈 ahora la raíz es Index
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'categorias/:id/productos', loadComponent: () => import('./pages/productos-por-categoria/productos-por-categoria.component').then(m => m.ProductosPorCategoriaComponent) },
    { path: 'producto/:id', loadComponent: () => import('./pages/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent)}, // 👈 ruta para productos por categoría
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
    },
    { path: '**', redirectTo: '' }, // 👈 si no encuentra, también va a Index
];