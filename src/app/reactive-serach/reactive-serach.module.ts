import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSerachRoutingModule } from './reactive-serach-routing.module';
import { LibSearchComponent } from './lib-search/lib-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveSerachRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ReactiveSerachModule { }
