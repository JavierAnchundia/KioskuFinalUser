import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { LocationService } from '../../services/location/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/config/helpers';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PurchaseCreditsComponent } from '../purchase-credits/purchase-credits.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUserInfo: any = null;
  private currUserId: string = '';
  public editEnabled = false;
  public provinces: any[] = [];
  public cities: any[] = [];
  public provinceId = '';
  public numericNumberReg = '[0-9]*';
  // Forms
  public signUpForm!: FormGroup;

  constructor(
    private usuario: UsuarioService,
    private location: LocationService,
    private fb: FormBuilder,
    private message: NzMessageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currUserId = this.usuario.getCurrentUserId();
    this.loadCurrentUserInfo();
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [''],
      city: [null,],
      province: [null, ],
      celular: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numericNumberReg)]],
      cedula: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numericNumberReg)]]
    },
    );


  }

  get f() { return this.signUpForm.controls; }


  loadCurrentUserInfo(): void{
    this.usuario.getUserInfo(this.currUserId)
    .then((userData: any) => {
      this.currentUserInfo = userData;
    })
    .catch(err => console.log(err));

  }

  loadProvinces(): void{
    this.location.retrieveProvinces()
    .then(data => this.provinces = data)
    .catch(err => console.log(err))
  }

  loadCities(event?: any): void{
    if (event){
      this.provinceId = event.value;
    }
    this.location.retrieveCities(this.provinceId)
    .then(data => this.cities = data)
    .catch(err => console.log(err))
  }

  enableEdit(): void{
    this.editEnabled = !this.editEnabled;
    this.provinceId = this.currentUserInfo.provincia.id;

    if (this.editEnabled){
      this.signUpForm.patchValue({
        name: this.currentUserInfo?.name,
        email: this.currentUserInfo?.email,
        address: this.currentUserInfo?.address,
        city: this.currentUserInfo?.ciudad.id,
        province: this.currentUserInfo?.provincia.id,
        celular: this.currentUserInfo.celular,
        cedula: this.currentUserInfo.cedula,
      });
      this.loadProvinces();
      this.loadCities();
    }
  }

  cancelEdit(): void{
    this.editEnabled = !this.editEnabled;
  }

  updateUserProfile(form: any): void{
    if (!this.signUpForm.valid){
      console.log('no valido')
    } else {
      this.submitProfileUpdated(form);
    }
  }

  submitProfileUpdated(form: any): void{
    const userProfile = new FormData();
    const id = this.message.loading('Actualizando perfil...', { nzDuration: 0 }).messageId;
    userProfile.append('name', form.name);
    userProfile.append('email', form.email);
    userProfile.append('address', form.address);
    userProfile.append('ciudad', form.city);
    userProfile.append('provincia', form.province);
    userProfile.append('cedula', form.cedula);
    userProfile.append('celular', form.celular);

    this.usuario.updateUser(this.currentUserInfo.id, userProfile)
    .then((resp: any) => {
      this.message.remove(id);
      this.message.success('Actualización completada.', { nzDuration: 1000 });
      this.editEnabled = !this.editEnabled;
      this.loadCurrentUserInfo();
    })
    .catch(error => console.log(error))
  }

  openCreditsModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '20',
    };
    dialogConfig.width = '400px'
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(PurchaseCreditsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Purchased') {
        this.loadCurrentUserInfo();
      }
    });
  }
}
