import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/config/helpers';
import { LocationService } from 'src/app/services/location/location.service';
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
   private user: any;
   public userID: any;

   // Lists
   public provinces: any[] = [];
   public cities: any[] = [];

   public numericNumberReg = '[0-9]*';
  constructor(
    private fb: FormBuilder,
    private usuario: UsuarioService,
    private location: LocationService,
    public dialogRef: MatDialogRef<SignupComponent>,
  ) { }

  ngOnInit(): void {
    this.loadProvinces();
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: ['', Validators.required],
      address: [''],
      city: [null,],
      province: [null, ],
      celular: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numericNumberReg)]],
      cedula: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numericNumberReg)]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
  });

  this.user = {
    email: ' ',
    password: ' '
  };
  }

  get f() { return this.signUpForm.controls; }


  submitForm(form: any): void {

    if (!this.signUpForm.valid) {
      Swal.fire('Completar todos los campos para continuar.', '', 'error');
    } else {
      Swal.showLoading();
      const fd = this.buildFormData(form);
      this.usuario.registerUser(fd).subscribe(
        (data: any) => {
          this.user.email = form.email;
          this.user.password = form.password;

          Swal.fire('El usuario se ha agregado con éxito.');

          this.usuario.loginUser(this.user)
          .subscribe(async resp => {
            this.userID = JSON.parse(localStorage.getItem('user') || '{}').user_id;
            this.loadUserInfo();
          }, error => {
            console.log(error);
            Swal.fire('Correo o contraseña incorrectos.', 'Intente nuevamente');
          });
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
      usuarioF.append('ciudad', form.city);
      usuarioF.append('provincia', form.province);
      usuarioF.append('cedula', form.cedula);
      usuarioF.append('celular', form.celular);
      usuarioF.append('saldo', '0');
      return usuarioF;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    loadProvinces(): void{
      this.location.retrieveProvinces()
      .then(data => this.provinces = data)
      .catch(err => console.log(err))
    }

    loadCities(event: any): void{
      console.log(event);
      this.location.retrieveCities(event)
      .then(data => this.cities = data)
      .catch(err => console.log(err))
    }

    loadUserInfo(): void {

      this.usuario.getUserInfo(this.userID).then(
        (data: any) => {
          this.user = data;
          Swal.close();
          this.dialogRef.close({ event: 'UserLogged' });
          this.usuario.setUserStatus(true);
          location.reload()
        });
    }

}
