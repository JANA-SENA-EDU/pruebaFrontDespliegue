import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent {
  colorForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ColorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.color;
    
    this.colorForm = this.fb.group({
      codigoColor: [data.color?.codigoColor || '', [Validators.required, Validators.pattern(/^#[0-9A-Fa-f]{6}$/)]],
      nombreColor: [data.color?.nombreColor || '', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit() {
    if (this.colorForm.valid) {
      const colorData = {
        ...this.colorForm.value,
        idColor: this.data.color?.idColor || null
      };
      this.dialogRef.close(colorData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
