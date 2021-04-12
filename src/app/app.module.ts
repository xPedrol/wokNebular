import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeModule} from './@theme/theme.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbCardModule} from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeModule.forRoot(),
        NbCardModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
