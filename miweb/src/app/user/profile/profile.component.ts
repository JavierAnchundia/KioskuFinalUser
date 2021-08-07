import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { LocationService } from '../../services/location/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/config/helpers';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  public cityId = '';
  public provinceId = '';

  // Forms
  public signUpForm!: FormGroup;

  constructor(
    private usuario: UsuarioService,
    private location: LocationService,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.currUserId = this.usuario.getCurrentUserId();
    this.loadCurrentUserInfo();
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [''],
      city: [null,],
      province: [null, ]
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
        province: this.currentUserInfo?.provincia.id
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

    this.usuario.updateUser(this.currentUserInfo.id, userProfile)
    .then((resp: any) => {
      this.message.remove(id);
      this.message.success('Actualización completada.', { nzDuration: 1000 });
      this.editEnabled = !this.editEnabled;
      this.loadCurrentUserInfo();
    })
    .catch(error => console.log(error))
  }
}
