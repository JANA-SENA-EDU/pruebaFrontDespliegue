import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EstadoProductoService } from '../../../services/estado-producto.service';

@Component({
  selector: 'app-estado-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './estado-producto.component.html',
  styleUrl: './estado-producto.component.css'
})
export class EstadoProductoComponent {
  estados: any[] = [];
  estadoForm = {
    idEstadoProducto: null,
    nombreEstado: ''
  };

  displayedColumns = ['nombreEstado', 'acciones'];

  constructor(private estadoService: EstadoProductoService) {}

  ngOnInit() {
    this.obtenerEstados();
  }

  obtenerEstados() {
    this.estadoService.listarEstados().subscribe({
      next: (res) => (this.estados = res)
    });
  }

  guardarEstado() {
    if (!this.estadoForm.nombreEstado.trim()) return;

    if (this.estadoForm.idEstadoProducto) {
      // actualizar
      this.estadoService.actualizarEstado(this.estadoForm).subscribe(() => {
        this.obtenerEstados();
        this.resetFormulario();
      });
    } else {
      // crear
      this.estadoService.registrarEstado(this.estadoForm).subscribe(() => {
        this.obtenerEstados();
        this.resetFormulario();
      });
    }
  }

  editarEstado(estado: any) {
    this.estadoForm = { ...estado };
  }

  eliminarEstado(id: number) {
    this.estadoService.eliminarEstado(id).subscribe(() => this.obtenerEstados());
  }

  resetFormulario() {
    this.estadoForm = {
      idEstadoProducto: null,
      nombreEstado: ''
    };
  }
}
