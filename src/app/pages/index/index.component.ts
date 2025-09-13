import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CategoriaService } from '../../admin/services/categoria.service';  // Ajusta ruta según tu proyecto
import { Categoria } from '../../admin/models/categoria.model';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule]
})
export class IndexComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private router: Router, private categoriaService: CategoriaService) {}

  imagenes = [
    'assets/img/banner1.png',
    'assets/img/banner2.png',
    'assets/img/banner3.png'
  ];
  indexActual = 0;

  ngOnInit() {
    setInterval(() => this.siguiente(), 5000); // Auto-slide cada 5 segundos
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe(
      data => this.categorias = data,
      err => console.error('Error cargando categorías', err)
    );
  }

  getTransform() {
    return `translateX(-${this.indexActual * 100}%)`;
  }

  siguiente() {
    this.indexActual = (this.indexActual + 1) % this.imagenes.length;
  }

  anterior() {
    this.indexActual = (this.indexActual - 1 + this.imagenes.length) % this.imagenes.length;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  verProductosPorCategoria(idCategoria: number) {
    this.router.navigate(['/categorias', idCategoria, 'productos']);
  }
}
