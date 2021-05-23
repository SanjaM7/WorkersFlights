import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    DurationPipe,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    DurationPipe,
  ]
})
export class SharedModule { }
