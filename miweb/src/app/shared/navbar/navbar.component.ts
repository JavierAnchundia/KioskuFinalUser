import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public authenticated = false;

  constructor(
    private usuario: UsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authenticated = this.usuario.getUserStatus();
    console.log(this.authenticated);
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'UserLogged') {
        this.authenticated = true;
        this.usuario.setUserStatus(true);
      }
    });
  }

  confirmLogout(): void{
    Swal.fire({
      title: '¿Está seguro que desea cerrar su sesión?',
      showCancelButton: true,
      confirmButtonText: 'Cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuario.setUserStatus(false);
        this.usuario.logoutUser();
        this.authenticated = this.usuario.getUserStatus();
      }
    })
  }
}
