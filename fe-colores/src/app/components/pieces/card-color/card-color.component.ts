import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ColorModalComponent } from '../../modals/color-modal/color-modal.component';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html',
  styleUrls: ['./card-color.component.scss'],
  animations: [
    trigger('ingreso', [
      state('fin', style({
        'padding-top': '0',
        transform: 'scale(1)',
        opacity: '1'
      })),
      state('inicio', style({
        'padding-top': '100px',
        transform: 'scale(0.8)',
        opacity: '0'
      })),
      transition('inicio => fin', animate('500ms ease-in')),
      transition('fin => inicio', animate('500ms ease-out'))
    ]),
    trigger('seleccion', [
      state('hover', style({
        // 'padding-top': '100px',
        transform: 'scale(1.1)'
      })),
      state('out', style({
        // 'padding-top': '0',
        transform: 'scale(1)'
      })),
      transition('out => hover', animate('200ms')),
      transition('hover => out', animate('200ms'))
    ]),
    trigger('seleccion2', [
      state('hover', style({
        // 'padding-top': '100px',
        transform: 'scale(1.1)',
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        '-webkit-box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      })),
      state('out', style({
        // 'padding-top': '0',
        transform: 'scale(1)',
        'box-shadow': '0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 22px 0 rgba(0, 0, 0, 0.19)',
        '-webkit-box-shadow': '0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 22px 0 rgba(0, 0, 0, 0.19)'
      })),
      transition('out => hover', animate('200ms')),
      transition('hover => out', animate('200ms'))
    ])
  ]
})
export class CardColorComponent implements OnInit {
  @Input() color: any;
  ngStyle = {}
  estadoLogin = 'inicio';
  estadoSpinner = 'inicio';
  isSelected = 'out';
  isSelected2 = 'out';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.ngStyle = {
      background: this.color.color
    }
  }

  isHover(key) {
    switch (key) {
      case 1:
        this.isSelected = 'hover';
        break;
      case 2:
        this.isSelected2 = 'hover';
        break;
    }
  }

  isOut(key) {
    switch (key) {
      case 1:
        this.isSelected = 'out';
        break;
      case 2:
        this.isSelected2 = 'out';
        break;
    }
  }

  clickColor() {
    console.log(this.color)
    const modalColor = this.dialog.open(ColorModalComponent, {
      width: '450px',
      data: this.color
    });
    modalColor.afterClosed().subscribe(result => {
      console.log('Se Ha Cerrado')
    });
  }

}
