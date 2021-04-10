import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.scss']
})
export class ColorModalComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public data;
  formColor: FormGroup;
  titulo = 'Editar Color';


  constructor() { }

  ngOnInit(): void {
    this.formColor = new FormGroup({

    });
  }

}
