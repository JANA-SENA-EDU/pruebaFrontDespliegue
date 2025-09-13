import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from '../../services/producto.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos-por-categoria',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule], // <-- agrega RouterModule aquí
  templateUrl: './productos-por-categoria.component.html',
  styleUrl: './productos-por-categoria.component.css'
})
export class ProductosPorCategoriaComponent implements OnInit {
  productos: any[] = [];

  constructor(private route: ActivatedRoute, private productoService: ProductoService, private router: Router) {}

  ngOnInit() {
    const idCategoria = Number(this.route.snapshot.paramMap.get('id'));
    if (idCategoria) {
      this.productoService.listarPorCategoria(idCategoria).subscribe(
        data => this.productos = data,
        err => this.productos = []
      );
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}