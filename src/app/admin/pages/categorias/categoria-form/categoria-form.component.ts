import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CategoriaFormComponent {
  formCategoria: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formCategoria = this.fb.group({
      idCategoria: [data?.idCategoria ?? null],
      nombreCategoria: [data?.nombreCategoria ?? '', Validators.required],
      descripcion: [data?.descripcion ?? ''],
      imagen: [data?.imagen ?? '']
    });
  }

  guardar(): void {
    if (this.formCategoria.valid) {
      this.dialogRef.close(this.formCategoria.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}