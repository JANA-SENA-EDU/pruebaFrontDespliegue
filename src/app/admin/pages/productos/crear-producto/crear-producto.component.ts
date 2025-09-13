import { Component, OnInit} from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { ColorService } from '../../../services/color.service';
import { EstadoProductoService } from '../../../../services/estado-producto.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit  {
  producto: any = {
    nombre: '',
    descripcion: '',
    dimensiones: '',
    idCategoria: null,
    idEstadoProducto: null,
    imagenes: [],
    colores: []
  };
   esEdicion: boolean = false;

  categorias: any[] = [];
  colores: any[] = [];
  estadosProducto: any[] = [];
  imagenes: string[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private colorService: ColorService,
    private estadoProductoService: EstadoProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.cargarListas(); // primero carga las opciones

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.esEdicion = true;
    this.productoService.obtenerPorId(+id).subscribe(p => {
      this.producto = p;
      this.imagenes = p.imagenes.map((img: any) => img.urlImagen);
    });
  }
}

cargarListas(): void {
  this.categoriaService.listar().subscribe(c => this.categorias = c);
  this.colorService.listarColores().subscribe(c => this.colores = c);
  this.estadoProductoService.listarEstados().subscribe(e => this.estadosProducto = e);
}

  toggleColor(idColor: number, event: any): void {
    if (event.target.checked) {
      this.producto.colores.push({ idColor });
    } else {
      this.producto.colores = this.producto.colores.filter((c: { idColor: number }) => c.idColor !== idColor);

    }
  }

  agregarImagen(): void {
    this.imagenes.push('');
  }

  eliminarImagen(index: number): void {
    this.imagenes.splice(index, 1);
  }

  guardarProducto(): void {
  this.producto.imagenes = this.imagenes
    .filter(url => url.trim() !== '')
    .map(url => ({ urlImagen: url }));

  const request = this.esEdicion
    ? this.productoService.actualizarProducto(this.producto)
    : this.productoService.registrarProducto(this.producto);

  request.subscribe({
    next: () => {
      alert(this.esEdicion ? 'Producto actualizado correctamente' : 'Producto registrado correctamente');
      this.router.navigate(['/admin/productos']);
    },
    error: (err) => {
      alert('Error: ' + err.message);
    }
  });
}

estaSeleccionadoColor(idColor: number): boolean {
  return this.producto.colores?.some((c: any) => c.idColor === idColor);
}

cancelar(): void {
  this.router.navigate(['/admin/productos']);
}

}

