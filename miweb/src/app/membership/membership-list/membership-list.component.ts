import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MembershipService } from 'src/app/services/membership/membership.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.css']
})
export class MembershipListComponent implements OnInit {

  public membershipList: any[] = [];
  public confirmModal?: NzModalRef;
  public currentUserMem = null;

  constructor(
    private membresia: MembershipService,
    private usuario: UsuarioService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.loadMemberships();
    if (this.usuario.getUserStatus()){
      this.getCurrentUserMem();
    }
  }

  loadMemberships(): void{
    this.membresia.retrieveMemberships()
    .then(data => this.membershipList = data)
    .catch(err => console.error(err))
  }

  getCurrentUserMem(): void{
    this.usuario.getUserInfo(this.usuario.getCurrentUserId())
    .then(user => {
      this.currentUserMem = user.membresia.id;
    })
  }

  subscribe(membresia: any): void{
    this.confirmModal = this.modal.confirm({
      nzTitle: '¿Está seguro que desea actualizar su membresía?',
      nzContent: 'Su membresía se actualizará a ' + membresia.tipo + '.',
      nzOnOk: () =>
       {
        this.updateSuscription(membresia.id);

       }

    });
  }

  updateSuscription(id: string): void{
    const loadingMsg = this.message.loading('Procesando solicitud...').messageId;

    const membership = {membresia: id};
    this.usuario.updateUser(this.usuario.getCurrentUserId(), membership)
    .then(resp => {
      this.message.remove(loadingMsg);
      this.message.create('success', 'La membresía se ha adquirido con éxito.');
      setTimeout(() => {
        this.ngOnInit();
      }, 1000)

    })
    .catch(err => {
      console.error(err);
      this.message.create('error', 'Ocurrió un error en la solicitud. Intente nuevamente.');
    })
  }

}
