import { Component,OnInit  } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../admin/services/categoria.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

    productos: any[] = [];
    categorias: any[] = [];
    categoriaSeleccionada: number | null = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
     this.obtenerCategorias();
    this.obtenerProductos(); 

  }

  obtenerCategorias() {
  this.categoriaService.listar().subscribe({
    next: (data) => this.categorias = data,
    error: () => this.categorias = []
  });
}

obtenerProductos(categoriaId?: number) {
  if (categoriaId) {
    this.productoService.listarPorCategoria(categoriaId).subscribe({
      next: (data) => this.productos = data,
      error: () => this.productos = []
    });
  } else {
    this.productoService.listarProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.productos = []
    });
  }
}

onCategoriaChange(event: any) {
  const id = Number(event.target.value);
  this.categoriaSeleccionada = id || null;
  this.obtenerProductos(this.categoriaSeleccionada!);
}

eliminarProducto(idProducto: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    this.productoService.eliminarProducto(idProducto).subscribe({
      next: () => {
        this.obtenerProductos(this.categoriaSeleccionada!); // refresca lista
      },
      error: () => {
        // Ya se notifica en el servicio
      }
    });
  }
}
}
