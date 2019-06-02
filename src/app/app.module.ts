import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServerModule } from './server/server.module';
import { CaModule } from './ca/ca.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { ModelModule } from './model/model.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
    ServerModule,
    CaModule,
    UserModule,
    ModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
