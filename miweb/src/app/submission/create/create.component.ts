import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoItemService } from 'src/app/services/estadoItem/estado-item.service';
import { ImagenItemService } from 'src/app/services/imagen-item/imagen-item.service';
import { ItemService } from 'src/app/services/item/item.service';
import Swal from 'sweetalert2';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public authenticated = false;
  public itemForm!: FormGroup;
  public submissionOptions = [
    {
      label: 'En domicilio', hint: 'El artículo se recoge en el domicilio y es evaluado posteriormente en las oficinas',
      value: 'En domicilio'
    },
    { label: 'Oficina de la empresa', value: 'Oficina de la empresa' },
    { label: 'Recoger y evaluar en domicilio', value: 'Recoger y evaluar en domicilio' }
  ]

  fileList: NzUploadFile[] = [];
  uploading = false;

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };


  constructor(
    private fb: FormBuilder,
    private item: ItemService,
    private imgItem: ImagenItemService,
    private estado: EstadoItemService,
    private message: NzMessageService,
    public dialog: MatDialog,
    private usuario: UsuarioService,
  ) {
    this.authenticated = this.usuario.getUserStatus();
  }

  ngOnInit(): void {
    if (!this.authenticated) {
      this.openLoginModal();
    }
    this.itemForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: ['', [Validators.required]],
      file: ['',],
      fileSource: ['',],
      entrega: [null, [Validators.required]],
      cantidad: [1,]
    })
  }


  submit() {
    if (!this.authenticated) {
      this.openLoginModal();
    } else {
      if (!this.itemForm.valid) {
        //this.openSnackBar('Complete todos los campos para poder continuar.', 'Cerrar');
        this.message.create('error', 'Complete todos los campos para poder continuar.');

      } else {
        //Swal.showLoading();
        const id = this.message.loading('Procesando solicitud...').messageId;

        this.addEstado()
          .catch(error => console.log(error))
          .then(resp => {
            this.addItem(resp.id, this.itemForm.value)
              .catch(error => console.log(error))
              .then(item => {
                this.addImageItem(item.id)
                  .then(img => {
                    //Swal.close();
                    this.message.remove(id);
                    this.message.create('success', 'El ítem se ha creado con éxito.');

                    //this.openSnackBar('El ítem se ha creado con éxito.', 'Cerrar');
                    this.itemForm.patchValue({
                      nombre: '',
                      descripcion: '',
                      entrega: null,
                    });
                    for (let control in this.itemForm.controls) {
                      this.itemForm.controls[control].setErrors(null);
                    }
                    this.fileList = [];
                  }
                  )
                  .catch(error => {
                    console.log(error);
                    this.message.create('error', 'No se pudo crear el ítem. Intente nuevamente.');

                  })


              });
          });
      }
    }
  }

  addItem(idEstado: string, form: any): Promise<any> {
    const item = new FormData();

    item.append('titulo', form.nombre);
    item.append('descripcion', form.descripcion);
    item.append('cantidad', form.cantidad);
    item.append('propietario', this.usuario.getCurrentUserId());
    item.append('entrega', form.entrega);
    item.append('estado', idEstado);

    return this.item.createItem(item);
  }


  addEstado(): Promise<any> {
    const estado = new FormData();

    estado.append('estado', 'Por evaluar');

    return this.estado.createEstado(estado)
  }

  addImageItem(idItem: string): Promise<any> {

    this.uploading = true;
    const imagesList: any[] = [];
    this.fileList.forEach((element: any) => {
      imagesList.push(
        {
          imagen: element.thumbUrl,
          name: element.name,
          item: idItem
        }
      )

    })

    return this.imgItem.createImagenItem({ imagesList })
  }


  /* openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  } */

  openLoginModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '10vh',
    };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'UserLogged') {
        this.authenticated = true;
        this.usuario.setUserStatus(true);
      }
    });
  }
}
