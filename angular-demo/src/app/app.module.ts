import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableUserAccountComponent } from './table-user-account/table-user-account.component';
import { TableUserMessageComponent } from './table-user-message/table-user-message.component';
import { FormUserAccountComponent } from './form-user-account/form-user-account.component';
import { FormUserMessageComponent } from './form-user-message/form-user-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TableUserAccountComponent,
    TableUserMessageComponent,
    FormUserAccountComponent,
    FormUserMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
