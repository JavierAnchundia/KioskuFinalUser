import { Component, OnInit } from '@angular/core';
import { ImagenItemService } from 'src/app/services/imagen-item/imagen-item.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditItemComponent } from '../edit-item/edit-item.component'
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers: [NzMessageService]
})
export class PanelComponent implements OnInit {
  private userID = "";
  public itemsList: any[] = [];

  constructor(
    private item: ItemService,
    private imagenItem: ImagenItemService,
    private usuario: UsuarioService,
    private nzMessageService: NzMessageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userID = this.usuario.getCurrentUserId();
    this.loadItems();
  }

  loadItems(): void {
    this.itemsList = [];
    this.item.retrieveItemsByUser(this.userID)
      .then(items => {
        items[1].forEach((element: any) => {
          this.itemsList.push({
            id: element.id,
            titulo: element.titulo,
            descripcion: element?.descripcion,
            estado: element?.estado,
            creditos: element?.creditos,
            thumbnail: 'http://127.0.0.1:8000/static' + items[0].filter((img: any) => img.item === element?.id)[0].imagen
          });
        })
      })
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
}
