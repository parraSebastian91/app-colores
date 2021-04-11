import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Color } from '../../../interfaces/color';
import Swal from 'sweetalert2';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.scss']
})
export class ColorModalComponent implements OnInit {
  @ViewChild('colorForm', { static: false }) colorForm: FormGroupDirective;
  colorState = '';
  formColor: FormGroup;
  titulo = 'Editar Color';
  isNew: boolean;
  color: Color;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Color,
    private colorService: ColorService,
    public dialogRef: MatDialogRef<ColorModalComponent>
  ) { }

  ngOnInit(): void {
    this.formColor = new FormGroup({
      nombreColor: new FormControl('', [Validators.required]),
      pantone: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
    });
    if (this.data) {
      this.setModal();
    } else {
      this.titulo = 'Crear Color';
      this.isNew = true;
      this.color = {
        id: -1,
        name: "",
        color: "",
        pantone: "",
        year: ""
      };
    }
  }

  setModal() {
    this.formColor.get('nombreColor').setValue(this.data.name);
    this.formColor.get('pantone').setValue(this.data.pantone);
    this.formColor.get('year').setValue(this.data.year);
    this.colorState = this.data.color;
  }

  changeComplete(evt) {
    this.colorState = evt.color.hex;
  }

  eliminar() {
    this.color = {
      id: ((this.data) ? this.data.id : -1),
      name: this.formColor.get('nombreColor').value,
      color: this.colorState,
      pantone: this.formColor.get('pantone').value,
      year: this.formColor.get('year').value,
    };
    this.colorService.deleteColor(this.color).then(t => {
      this.dialogRef.close(t);
    });

  }

  guardar() {
    let promesas;
    this.color = {
      id: ((this.data) ? this.data.id : -1),
      name: this.formColor.get('nombreColor').value,
      color: this.colorState,
      pantone: this.formColor.get('pantone').value,
      year: this.formColor.get('year').value,
    }
    if (this.formColor.valid && this.colorState !== '') {
      if (this.isNew) {
        promesas = this.colorService.setColor(this.color);
      } else {
        promesas = this.colorService.updColor(this.color);
      }
    } else {
      Swal.fire({
        title: 'Debe completar todos los datos',
        icon: 'warning',
        confirmButtonText: 'OK!'
      })
    }
    promesas.then(t => {
      this.dialogRef.close(t);
    })
  }

}
