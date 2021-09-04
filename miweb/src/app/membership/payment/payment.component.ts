import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {
  public currMembresia: any = null;
  public msg!: string;

  @ViewChild('paypalRef', { static: true}) private paypalRef!: ElementRef;
  paidFor: boolean = false; //Payment Successful Message handling

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<PaymentComponent>,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private usuario: UsuarioService,
  ) {
    console.log(data);
    this.currMembresia = data.membresia;
    this.msg = data.message;
   }

  ngOnInit(): void {
    this.renderPaypalBtn();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  renderPaypalBtn() : void{

    window.paypal.Buttons(
      {
        style:{
          layout: 'horizontal',
          shape: 'rect',
        },
        createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: string; currency_code: string; }; }[]; }) => any; }; }) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: String(this.currMembresia.tarifa),
                  currency_code: 'USD'
                }
              }
            ]
          })
        },
        onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          //console.log(order)
          this.updateSuscription(this.currMembresia.id);
          // ! aqui se actualiza membresía de usuario y fecha de suscripcion

          },
          onError: (err: any) => {
          console.log(err)
          }

      }).render(this.paypalRef.nativeElement);
  }

  updateSuscription(id: string): void{
    const loadingMsg = this.message.loading('Procesando solicitud...').messageId;

    const membership = {membresia: id, fechaSuscripcion: this.datepipe.transform(new Date(), 'yyyy-MM-dd')};
    this.usuario.updateUser(this.usuario.getCurrentUserId(), membership)
    .then(resp => {
      this.message.remove(loadingMsg);
      this.message.create('success', 'La membresía se ha adquirido con éxito.');
      setTimeout(() => {
        this.closeDialog();
      }, 1000)

    })
    .catch(err => {
      console.error(err);
      this.message.remove(loadingMsg);
      this.message.create('error', 'Ocurrió un error en la solicitud. Intente nuevamente.');
    })
  }

  cancelPlan(): void{
    const loadingMsg = this.message.loading('Procesando solicitud...').messageId;

    const membership = {membresia: '1', fechaSuscripcion: null};
    this.usuario.updateUser(this.usuario.getCurrentUserId(), membership)
    .then(resp => {
      this.message.remove(loadingMsg);
      this.message.create('success', 'La membresía se ha cancelado.');
      setTimeout(() => {
        this.closeDialog();
      }, 1000)

    })
    .catch(err => {
      console.error(err);
      this.message.remove(loadingMsg);
      this.message.create('error', 'Ocurrió un error en la solicitud. Intente nuevamente.');
    })
  }
}
