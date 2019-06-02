import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaNavBarComponent } from './ca-nav-bar/ca-nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { GeneratorComponent } from './generator/generator.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { TrustStorageComponent } from './trust-storage/trust-storage.component';

@NgModule({
  declarations: [
    CaNavBarComponent,
    GeneratorComponent,
    CertificateListComponent,
    TrustStorageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CaModule { }
