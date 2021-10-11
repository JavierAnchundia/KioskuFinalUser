import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditItemComponent } from '../edit-item/edit-item.component'
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CreditsModalComponent } from '../credits-modal/credits-modal.component';
import AUTH_SERVICIOS from 'src/app/config/urls';
import { Demo } from 'src/app/demo';

enum Action {
  YES = "aceptar",
  NO = "rechazar",
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers: [NzMessageService]
})



export class PanelComponent implements OnInit {
  private userID = "";
  public itemsList: any[] = [];
  private confirmModal?: NzModalRef;
  public pageNumber: string = '1';
  public pageSize: string = '6';
  public totalLength = 0;
  public actionOptions = Action;
  public mediaPath = AUTH_SERVICIOS.mediaURL;


  constructor(
    private item: ItemService,
    private usuario: UsuarioService,
    private nzMessageService: NzMessageService,
    public dialog: MatDialog,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,

  ) { }

  ngOnInit(): void {
    this.userID = this.usuario.getCurrentUserId();
    this.loadItems();
  }

  loadItems(): void {
    this.itemsList = [];
    const items = Demo.getSubmittedItems();
    this.totalLength = items[1];
    items[0].forEach((element: any) => {
      this.itemsList.push({
        id: element.id,
        titulo: element.titulo,
        descripcion: element?.descripcion,
        estado: element?.estado,
        creditos: element?.creditos,
        thumbnail: element?.thumbnail,
      });
    });
   /*  this.item.retrieveItemsByUser(this.userID, this.pageNumber, this.pageSize)
      .then(items => {
        this.totalLength = items[1];
        items[0].forEach((element: any) => {
          this.itemsList.push({
            id: element.id,
            titulo: element.titulo,
            descripcion: element?.descripcion,
            estado: element?.estado,
            creditos: element?.creditos,
            thumbnail: this.mediaPath + element?.thumbnail,
          });
        });
      }) */
  }



  openEditItem(item: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '3px',
    };
    dialogConfig.width = '400px';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      item
    };
    const dialogRef = this.dialog.open(EditItemComponent, dialogConfig);
    dialogRef.afterClosed().toPromise().then((result: any) => {
      if (result.event == 'Updated') {
        this.loadItems();
      }
    }
    );

  }

  confirm(id: string): void {
    this.item.deleteItem(id)
      .then(item => {
        this.nzMessageService.info('El item se ha eliminado.');
        this.loadItems();
      })
      .catch(error => {
        console.log(error);
        this.nzMessageService.info('No se pudo eliminar el ítem.')
      })
  }

  showConfirm(data: any): void {
    let isOkLoading = false;
    this.confirmModal = this.modal.confirm({
      nzTitle: '¿Está seguro que desea rechazar los créditos?',
      nzContent: 'Al rechazar los créditos, el artículo será devuelto dentro de un tiempo de dos semanas.',
      nzOkLoading: isOkLoading,
      nzOnOk: () => {
        isOkLoading = true;
        this.item.updateState(data.estado.id, { estado: 'Rechazado' })
          .then(update => {
            isOkLoading = false;
            this.loadItems();
          })
          .catch((error) => {
            console.log(error);
            isOkLoading = false;
          })
      }

    });
  }

  onIndexChange(event: any) {
    this.pageNumber = event;
    this.loadItems()
  }

  // testing';'

  createComponentModal(action: string, item: any): void {
    const modal = this.modal.confirm({
      nzTitle: '¿Está seguro que desea ' + action + ' los créditos?',
      nzContent: CreditsModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzOkText: action.substr(0,1).toUpperCase() + action.substr(1),
      nzOnOk: () => this.updateItemState(item, action),
      nzComponentParams: {
        action: action,
        currItem: item
      },
    });
    const instance = modal.getContentComponent();

    modal.afterClose.subscribe((result: any) => {
      console.log(result);

    });
  }

  updateItemState(currItem: any, action: string): void {
    const id = this.nzMessageService.loading('Procesando solicitud..', { nzDuration: 0 }).messageId;
    const enum  estado {
      aceptar = 'Aceptado',
      rechazar = 'Rechazado',
    }
    const stateEnum = action === 'aceptar' ? estado.aceptar : estado.rechazar;
    const state = { estado: stateEnum};
    this.item.updateState(currItem.estado.id, state)
      .then((updated: any) => {
        if (stateEnum === estado.aceptar) {
          this.updateCredits(currItem);
          this.nzMessageService.remove(id);
          this.loadItems();
        } else {
          this.nzMessageService.remove(id);
          this.nzMessageService.success('Solicitud completada.', { nzDuration: 1000 });
          this.loadItems();
        }

      })
      .catch((err: any) => {
        console.error(err);
        this.nzMessageService.error('No se pudo completar la solicitud. Intente nuevamente.', { nzDuration: 1000 });
      })
  }

  updateCredits(currItem: any): void {
    this.item.updateCredits(this.usuario.getCurrentUserId(), { creditos: currItem.creditos })
      .then((updated: any) => {
        this.nzMessageService.success('Solicitud completada.', { nzDuration: 1000 });

      })
      .catch((error: any) => {
        console.log(error);
        this.nzMessageService.error('No se pudo completar la solicitud. Intente nuevamente.', { nzDuration: 1000 });

      })
  }

}
