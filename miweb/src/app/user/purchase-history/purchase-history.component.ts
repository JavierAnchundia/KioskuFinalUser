import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes/ordenes.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { OrdenCompra } from 'src/app/models/ordenCompra';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderDetailComponent } from './order-detail/order-detail.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<OrdenCompra> | null;
  sortDirections: NzTableSortOrder[];
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<OrdenCompra> | null;
  filterMultiple?: boolean;
}

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  private userId = '';
  public listData: OrdenCompra[] = [];
  public listOfColumns: ColumnItem[] = [
    {
      name: 'Orden de compra',
      sortOrder: null,
      sortFn: (a: OrdenCompra, b: OrdenCompra) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Fecha',
      sortOrder: 'descend',
      sortFn: (a: OrdenCompra, b: OrdenCompra) => this.sortDateTime(a.dateCreated, b.dateCreated),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Estado',
      sortOrder: null,
      sortDirections: [null],
      sortFn: (a: OrdenCompra, b: OrdenCompra) => a.estadoCompra.length - b.estadoCompra.length,
      filterMultiple: true,
      listOfFilter: [
        { text: 'Por entregar', value: 'Por entregar' },
        { text: 'Entregado', value: 'Entregado' }
      ],
      filterFn: (estado: string, item: OrdenCompra) => item.estadoCompra.indexOf(estado) !== -1
    }
  ]

  constructor(
    private orden: OrdenesService,
    private usuario: UsuarioService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userId = this.usuario.getCurrentUserId();
    this.loadHistory();
  }

  sortDateTime(date1: Date, date2: Date): number {
    return Math.round((new Date(new Date(date2)).setHours(12)-new Date(new Date(date1)).setHours(12))/8.64e7);

  }

  loadHistory(): void{
    /*this.orden.retrieveHistorial(this.userId)
    .then((hist: any) => {*/

      this.listData = [
        {id:1,
        dateCreated:new Date("2021-07-11"),
        costoEntrega: 5,
        total: 50,
        estadoCompra: 'Entregado',
        detalle: 'item',
        totalCompra: 2,
        pago: 'Creditos'},

        {id:2,
          dateCreated:new Date("2021-11-07"),
          costoEntrega: 5,
          total: 50,
          estadoCompra: 'Entregado',
          detalle: 'item',
          totalCompra: 5,
          pago: 'Creditos'}
      ];
    //})
    //.catch((error: any) => {
     // console.log(error);
    //})
  }

  openOrderDetails(orden: any): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '5px',
    };
    dialogConfig.width = '400px';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      orden
    };
    const dialogRef = this.dialog.open(OrderDetailComponent, dialogConfig);


   
  }

}
