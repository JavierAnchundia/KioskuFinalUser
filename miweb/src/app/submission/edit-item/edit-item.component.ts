import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ItemService } from 'src/app/services/item/item.service';
import Swal from 'sweetalert2';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  public currentItem: any = null;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<EditItemComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private item: ItemService,
    private snackBar: MatSnackBar
  ) {
    this.currentItem = data.item;
    console.log(data);
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],

    })

    this.itemForm.patchValue({
      nombre: this.currentItem.titulo,
      descripcion: this.currentItem.descripcion,
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
}

  submit() {
    if (!this.itemForm.valid) {
      this.openSnackBar('Complete los campos para poder actualizar.', 'Cerrar');
    } else {
      Swal.showLoading();
      this.updateItem();
    }
  }

  updateItem(): void {
    const updatedItem = new FormData();

    updatedItem.append('titulo', this.itemForm.value.nombre);
    updatedItem.append('descripcion', this.itemForm.value.descripcion);

    this.item.editItem(this.currentItem.id, updatedItem)
      .then(item => {
        Swal.close();
        this.openSnackBar('El ítem se ha actualizado.', 'Cerrar');
        this.dialogRef.close({ event: 'Updated' });
      })
      .catch(error => {
        console.log(error);
        this.openSnackBar('Hubo un error al actualizar el ítem.', 'Cerrar');

      })

  }

}
