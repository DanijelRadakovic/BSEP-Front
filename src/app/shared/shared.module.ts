import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NavigationBarComponent,
  ]
})
export class SharedModule { }
