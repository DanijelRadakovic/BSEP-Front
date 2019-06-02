import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatCardModule, MatDatepickerModule, MatNativeDateModule,
  MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule,
   MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ScrollingModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NavigationBarComponent,
  ]
})
export class SharedModule { }
