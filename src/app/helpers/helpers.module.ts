import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenPipe } from './resumen.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ResumenPipe],
  declarations: [ResumenPipe]
})
export class HelpersModule { }
