import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {translateServerLoaderFactory} from './shared/translate-server.loader';
import {TransferState} from '@angular/platform-browser';
import {CookieBackendModule} from 'ngx-cookie-backend';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    CookieBackendModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
