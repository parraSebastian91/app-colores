import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.scss']
})
export class ColorModalComponent implements OnInit {
  @ViewChild('colorForm', { static: false }) colorForm: FormGroupDirective;
  colorState = '#fff';
  formColor: FormGroup;
  titulo = 'Editar Color';


  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.formColor = new FormGroup({
      nombreColor: new FormControl(),
      pantone: new FormControl(),
      year: new FormControl()
    });
    console.log(this.data)
    if (this.data) {
      this.setModal();
    } else {
      this.titulo = 'Crear Color';
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
    console.log(evt, this.colorState)
  }

  guardar() {

  }

}
