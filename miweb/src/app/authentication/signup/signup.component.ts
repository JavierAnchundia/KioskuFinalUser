import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   // Forms
   public signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuario: UsuarioService,
    public dialogRef: MatDialogRef<SignupComponent>,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      address: [''],
    })
  }

  submitForm(form: any): void {

    if (!this.signUpForm.valid) {
      Swal.fire('Completar todos los campos para continuar.', '', 'error');
    } else {
      Swal.showLoading();
      const fd = this.buildFormData(form);
      this.usuario.registerUser(fd).subscribe(
        (data: any) => {
          Swal.fire('El usuario se ha agregado con éxito.');
        },
        (error: any) => {
          if (error.error.email) {
            Swal.fire('Un usuario con este correo ya existe.', '', 'error');
          } else {
            Swal.fire('Hubo un error al guardar el usuario.', 'Intente nuevamente.', 'error');
            console.log(error);
          }
        }
      );
    }
  }

    // Construye form data con informacion a actualizar
    buildFormData(form: any): FormData{
      const usuarioF = new FormData();
      usuarioF.append('name', form.name);
      usuarioF.append('email', form.email);
      usuarioF.append('password', form.password);
      usuarioF.append('address', form.address);
      usuarioF.append('is_active', 'True');
      return usuarioF;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
