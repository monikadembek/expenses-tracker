import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  // tslint:disable-next-line: variable-name
  constructor(private _snackbar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message: string, time: number, positionHorizontal = this.horizontalPosition, positionVertical = this.verticalPosition) {
    this._snackbar.open(message, '', {
      duration: time,
      horizontalPosition: positionHorizontal,
      verticalPosition: positionVertical
    });
  }
}
