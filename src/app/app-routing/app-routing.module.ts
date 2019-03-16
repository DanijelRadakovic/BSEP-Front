import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IsSecurityAdminGuard } from './is-security-admin.guard';
import { IsBackupAdminGuard } from './is-backup-admin.guard';
import { ServerListComponent } from '../server/server-list/server-list.component';
import { AuthComponent } from '../user/auth/auth.component';
import { ServerCardComponent } from '../server/server-card/server-card.component';

const routes: Routes = [
  { path: 'server', component: ServerListComponent, canActivate: [IsSecurityAdminGuard] },
  // { path: 'map', component: MapComponent },
  // { path: 'userTickets/:id', component: UserTicketsComponent, canActivate: [IsAuthenticatedGuard] },
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

// imports: [
//   CommonModule,
//   RouterModule.forRoot([
//     { path: 'tickets', component: TicketsComponent, canActivate: [IsAuthenticatedGuard] },
//     { path: 'map', component: MapComponent },
//     { path: 'newsAdministration', component: NewsAdministrationComponent, canActivate: [IsOperaterGuard] },
//     { path: 'reports', component: ReportComponent, canActivate: [IsAdminGuard] },
//     { path: 'vehicles', component: VehicleComponent, canActivate: [IsOperaterGuard] },
//     { path: 'zones', component: ZoneComponent, canActivate: [IsOperaterGuard] },
//     { path: 'schedule', component: ScheduleComponent },
//     { path: 'updateSchedules', component: ScheduleUpdateComponent, canActivate: [IsOperaterGuard] },
//     { path: 'userTickets/:id', component: UserTicketsComponent, canActivate: [IsAuthenticatedGuard] },
//     { path: 'signin', component: AuthComponent },
//     { path: 'signup', component: SignupComponent },
//     { path: 'unconfirmedUsers', component: UnconfirmedUserListComponent, canActivate: [IsAdminGuard] },
//     { path: 'userProfile', component: UserProfileComponent, canActivate: [IsAuthenticatedGuard] },
//     { path: 'validators', component: ValidatorListComponent, canActivate: [IsAdminGuard] },
//     { path: 'operators', component: OperatorListComponent, canActivate: [IsAdminGuard] },
//     { path: 'registeredUsers', component: RegUserListComponent, canActivate: [IsAdminGuard] },
//     { path: 'pricelist', component: PricelistComponent, canActivate: [IsAdminGuard] },
//     { path: '', redirectTo: '/welcome', pathMatch: 'full' },
//     { path: '**', component: WelcomeComponent, pathMatch: 'full' }
//   ])
// ],