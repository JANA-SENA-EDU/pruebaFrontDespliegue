import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component'; // ✅ Nombre y ruta corregidos

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';

import { LoaderService } from '../shared/services/loader.service';
import { AlertService } from '../shared/services/alert.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent, // ✅ aquí también corregido
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isSidenavOpen = true;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Token después de redirigir:', localStorage.getItem('token'));
  }

  cerrarSesion() {
    this.loaderService.show();
    setTimeout(() => {
      this.authService.logout();
      this.loaderService.hide();
      this.alertService.success('Sesión cerrada con éxito', '¡Hasta pronto!');
      this.router.navigate(['/login']);
    }, 1000);
  }
}
