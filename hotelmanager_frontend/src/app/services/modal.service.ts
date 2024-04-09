import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) {}

  openDialog(component: any, config: any = {}) {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef.afterClosed();
  }
}
