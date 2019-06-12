import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GeneratorComponent } from './generator/generator.component';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { TrustStorageComponent } from './trust-storage/trust-storage.component';
import { DistributionComponent } from './distribution/distribution.component';

@NgModule({
  declarations: [
    GeneratorComponent,
    CertificateListComponent,
    TrustStorageComponent,
    DistributionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CaModule { }
