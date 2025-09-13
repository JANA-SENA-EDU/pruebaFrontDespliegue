import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColorFormComponent } from './color-form/color-form.component';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColorComponent implements OnInit {
  colores: any[] = [];
  displayedColumns: string[] = ['idColor', 'codigoColor', 'nombreColor', 'vista', 'acciones'];

  constructor(
    private colorService: ColorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listarColores();
  }

  listarColores() {
    this.colorService.listarColores().subscribe(
      data => this.colores = data,
      err => console.error('Error al cargar colores:', err)
    );
  }

  abrirFormulario(color: any = null) {
    const dialogRef = this.dialog.open(ColorFormComponent, {
      width: '450px',
      data: { color }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.idColor) {
          this.colorService.actualizarColor(result.idColor, result).subscribe(() => {
            this.listarColores();
          });
        } else {
          this.colorService.registrarColor(result).subscribe(() => {
            this.listarColores();
          });
        }
      }
    });
  }

  editarColor(color: any) {
    this.abrirFormulario(color);
  }

  eliminarColor(id: number) {
    if (confirm('¿Estás seguro de eliminar este color?')) {
      this.colorService.eliminarColor(id).subscribe(() => {
        this.listarColores();
      });
    }
  }
}
