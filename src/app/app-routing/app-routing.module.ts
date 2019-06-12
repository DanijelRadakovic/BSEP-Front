import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IsSecurityAdminGuard } from './is-security-admin.guard';
import { IsBackupAdminGuard } from './is-backup-admin.guard';
import { ServerListComponent } from '../server/server-list/server-list.component';
import { AuthComponent } from '../user/auth/auth.component';
import { GeneratorComponent } from '../ca/generator/generator.component';
import { CertificateListComponent } from '../ca/certificate-list/certificate-list.component';
import { TrustStorageComponent } from '../ca/trust-storage/trust-storage.component';
import { RegisterComponent } from '../user/register/register.component';
import { DistributionComponent } from '../ca/distribution/distribution.component';

const routes: Routes = [
  { path: 'server', component: ServerListComponent, canActivate: [IsSecurityAdminGuard] },
  { path: 'cer', component: CertificateListComponent, canActivate: [IsSecurityAdminGuard] },
  { path: 'gen', component: GeneratorComponent},
  { path: 'trust', component: TrustStorageComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dist', component: DistributionComponent},
  { path: '', redirectTo: '/server', pathMatch: 'full' },
  { path: '**', component: AuthComponent, pathMatch: 'full' }
];

@NgModule({
  providers: [
    IsSecurityAdminGuard,
    IsBackupAdminGuard
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

