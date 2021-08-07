import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item/item.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  public currItem: any = null;
  public isVisible = false;
  public isConfirmLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<CreditsComponent>,
    private item: ItemService,
    private usuario: UsuarioService,
    private message: NzMessageService,
  ) {
    this.currItem = data.item;
   }

  ngOnInit(): void {
  }

  updateItemState(): void{
    const id = this.message.loading('Procesando solicitud..', { nzDuration: 0 }).messageId;
    const state = {estado: 'Aceptado'};
    this.item.updateState(this.currItem.estado.id, state)
    .then(updated => {
      this.updateCredits();
      this.message.remove(id);
    })
    .catch(err => console.error(err))

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateCredits(): void{
    this.item.updateCredits(this.usuario.getCurrentUserId(), {creditos: this.currItem.creditos})
    .then(updated => {
      this.message.success('Solicitud completada.', { nzDuration: 1000 });
      this.dialogRef.close({ event: 'Updated' });
    })
    .catch(error => console.log(error))
  }

}
