import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IsSecurityAdminGuard } from './is-security-admin.guard';
import { IsBackupAdminGuard } from './is-backup-admin.guard';
import { ServerListComponent } from '../server/server-list/server-list.component';
import { AuthComponent } from '../user/auth/auth.component';
import { GeneratorComponent } from '../ca/generator/generator.component';
import { ConfigComponent } from '../ca/config/config.component';
import { CertificateListComponent } from '../ca/certificate-list/certificate-list.component';
import { TrustStorageComponent } from '../ca/trust-storage/trust-storage.component';

const routes: Routes = [
  { path: 'server', component: ServerListComponent, canActivate: [IsSecurityAdminGuard] },
  { path: 'ca/:id/gen', component: GeneratorComponent},
  { path: 'ca/:id/cer', component: CertificateListComponent},
  { path: 'ca/:id/conf', component: ConfigComponent},
  { path: 'ca/:id/trust', component: TrustStorageComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
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

