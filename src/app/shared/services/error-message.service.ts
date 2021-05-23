import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private snackBar: MatSnackBar) { }

  public displayErrorMessage(message: string): Observable<never> {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['alert', 'alert-danger']
    });
    return EMPTY;
  }
}
