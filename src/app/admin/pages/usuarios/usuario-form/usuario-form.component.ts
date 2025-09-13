import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  esEdicion: boolean = false;
  mostrarPassword: boolean = false;
  passwordReal: string = ''; 
  passwordOculta: string = '●●●●●●●●';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.esEdicion = !!this.data;
  
    this.usuarioForm = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      username: [this.esEdicion ? '' : this.data?.nombreUsuario || '', this.esEdicion ? [] : [Validators.required]],
      correo: [this.data?.correo || '', [Validators.required, Validators.email]],
      telefono: [this.data?.telefono || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [
        { value: this.esEdicion ? '●●●●●●●●' : '', disabled: this.esEdicion }, 
        this.esEdicion ? [] : [Validators.required, Validators.minLength(8)]
      ],
      estado: [this.data?.estado || 'activo', Validators.required]
    });
  }
  

  /**
   * Oculta la contraseña al hacer blur en el input
   */
  onBlurPassword() {
    if (!this.mostrarPassword && this.passwordReal) {
      this.usuarioForm.patchValue({ password: this.passwordOculta });
    }
  }

  /**
   * Guarda la contraseña real cuando el usuario la escribe
   */
  onPasswordChange(event: any) {
    this.passwordReal = event.target.value;
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
    this.usuarioForm.patchValue({
      password: this.mostrarPassword ? this.passwordReal : this.passwordOculta
    });
  }

  onGuardar() {
    if (this.usuarioForm.valid) {
      let usuario = this.usuarioForm.getRawValue();
  
      // Si es edición, eliminamos `username` y `password` del request
      if (this.esEdicion) {
        delete usuario.username;
        delete usuario.password;
      } else {
        usuario.password = this.passwordReal; // Enviar la contraseña real solo en registro
      }
  
      //Convertir estado de "activo"/"inactivo" a 1/0
      usuario.activo = usuario.estado === 'activo' ? 1 : 0;
      if (this.esEdicion) {
        // Modo edición
        this.usuarioService.actualizarUsuario(this.data.idUsuario, usuario).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        });
      } else {
        // Modo registro
        this.usuarioService.registrarUsuario(usuario).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Error al registrar usuario:', error);
          }
        });
      }
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }
}
