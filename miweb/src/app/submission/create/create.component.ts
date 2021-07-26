import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoItemService } from 'src/app/services/estadoItem/estado-item.service';
import { ImagenItemService } from 'src/app/services/imagen-item/imagen-item.service';
import { ItemService } from 'src/app/services/item/item.service';
import Swal from 'sweetalert2';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public itemForm!: FormGroup;
  public submissionOptions = [
    { label: 'En domicilio', hint: 'El artículo se recoge en el domicilio y es evaluado posteriormente en las oficinas',
     value: 'En domicilio' },
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
    private snackBar: MatSnackBar,
    private usuario: UsuarioService,
  ) { }

  ngOnInit(): void {

    this.itemForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: ['', [Validators.required]],
      file: ['', ],
      fileSource: ['', ],
      entrega: [null, [Validators.required]],
      cantidad: [1,]
    })
  }


  submit() {
    if (!this.itemForm.valid){
      this.openSnackBar('Complete todos los campos para poder continuar.', 'Cerrar');
    } else{
      Swal.showLoading();
      this.addEstado()
      .catch(error => console.log(error))
      .then(resp =>
        {
          this.addItem(resp.id, this.itemForm.value)
          .catch(error => console.log(error))
          .then(item =>
          {
            this.addImageItem(item.id)
            .then(img => {
              Swal.close();
              this.openSnackBar('El ítem se ha creado con éxito.', 'Cerrar');
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
            })


          });
        });
    }
  }

  addItem(idEstado: string, form: any): Promise<any>{
    const item = new FormData();

    item.append('titulo',form.nombre);
    item.append('descripcion',form.descripcion);
    item.append('cantidad', form.cantidad);
    item.append('propietario', this.usuario.getCurrentUserId());
    item.append('entrega',form.entrega);
    item.append('estado', idEstado);

    return this.item.createItem(item);
  }


  addEstado(): Promise<any>{
    const estado = new FormData();

    estado.append('estado', 'Por evaluar');

    return this.estado.createEstado(estado)
  }

  addImageItem(idItem: string): Promise<any>{
  
    this.uploading = true;
    const imagesList:any[] = [];
    this.fileList.forEach((element: any) =>
    {
      imagesList.push(
        {
          imagen: element.thumbUrl,
          name: element.name,
          item: idItem
        }
      )

    })

    return this.imgItem.createImagenItem({imagesList})
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
}
}
