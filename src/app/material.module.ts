import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [MatDatepickerModule,MatNativeDateModule],
  exports: [MatDatepickerModule,MatNativeDateModule],
})
export class MaterialModule { }