import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeModule} from './@theme/theme.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AuthInterceptor} from './shared/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
