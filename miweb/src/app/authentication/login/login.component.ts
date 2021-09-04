import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PaymentComponent } from 'src/app/membership/payment/payment.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Forms
  public loginForm!: FormGroup;

  // Variables
  private user: any;
  public userID: any;

  constructor(
    private fb: FormBuilder,
    private usuario: UsuarioService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.user = {
      email: ' ',
      password: ' '
    };
  }

  submitForm(form: any): void {

    if (form.invalid) {
      Swal.fire('Error en el inicio de sesión.', 'Complete los campos para iniciar sesión.', 'error');
    } else {
      Swal.showLoading();

      this.user.email = form.email;
      this.user.password = form.password;

      this.usuario.loginUser(this.user)
        .subscribe(async resp => {
          this.userID = JSON.parse(localStorage.getItem('user') || '{}').user_id;
          this.loadUserInfo();
        }, error => {
          console.log(error);
          Swal.fire('Correo o contraseña incorrectos.', 'Intente nuevamente');
        });
    }
  }

  loadUserInfo(): void {

    this.usuario.getUserInfo(this.userID).then(
      (data: any) => {
        this.user = data;
        localStorage.setItem('type', data.rol);
        Swal.close();
        this.checkMembership();
        this.dialogRef.close({ event: 'UserLogged' });
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSignUpModal(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '600px'
    dialogConfig.width = '600px'
    dialogConfig.position = {
      'top': '10px',
    };
    this.dialog.open(SignupComponent, dialogConfig);
    dialogConfig.disableClose = true;
    this.dialogRef.close();
  }

  checkMembership(): void {

    if (this.user.fechaSuscripcion){
      const dateSplit = this.user.fechaSuscripcion?.split('-');
      const startDate = new Date(dateSplit[0], dateSplit[1], dateSplit[2]);

      startDate.setHours(0, 0, 0, 0);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const days = Math.floor((startDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
      if (days <= 7){
        const msg = 'Tienes ' + days + ' para renovar tu membresía antes de que caduque.';
        this.openPaymentModal(msg, this.user.membresia);
      }
    }
  }

  openPaymentModal(message: string, membresia: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '10vh',
    };
    dialogConfig.data = {membresia, message};
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(PaymentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        location.reload();
    });
  }
}
