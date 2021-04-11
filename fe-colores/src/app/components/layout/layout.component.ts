import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ColorModalComponent } from '../modals/color-modal/color-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  colorList = [];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;


  constructor(
    private colorService: ColorService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.init();
  }

  init() {
    this.createSession();
    this.getColorList();
  }

  async createSession() {
    await this.authService.createSession().then(t => {
      console.log('Session created')
    });
  }

  getColorList() {
    this.colorService.getColorList(this.pageSize, this.pageIndex)
      .then((t: any) => {
        this.length = t.pagination.total;
        this.pageSize = t.pagination.pp;
        this.pageIndex = t.pagination.page;
        this.colorList = t.items;
      })
      .catch(err => {
        console.log(err)
      })
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getColorList();
  }

  agregarColor() {
    const modalColor = this.dialog.open(ColorModalComponent, {
      width: '450px',
      data: undefined,
      disableClose: true
    });
    modalColor.afterClosed().subscribe(result => {
      this.mensaje(result);
    });
  }

  mensaje(msj) {
    Swal.fire({
      title: ((msj.cod===200)?'Operacion Existosa':'Existio un problema en la operacion'),
      icon: ((msj.cod===200)?'success':'warning'),
      confirmButtonText: 'OK!'
    }).then(m => {
      this.getColorList();
    })
  }

}
