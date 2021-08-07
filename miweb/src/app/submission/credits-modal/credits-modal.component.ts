import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ItemService } from 'src/app/services/item/item.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-credits-modal',
  templateUrl: './credits-modal.component.html',
  styleUrls: ['./credits-modal.component.css']
})
export class CreditsModalComponent implements OnInit {

  @Input() currItem: any;
  @Input() action!: string;
  public isConfirmLoading = false;
  constructor(
    private modal: NzModalRef,
    private item: ItemService,
    private usuario: UsuarioService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    console.log(this.currItem);
  }

  destroyModal(): void {
    this.modal.destroy({ data: 'Updated' });
  }
}
