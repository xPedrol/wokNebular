import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [CardComponent, AccessDeniedComponent],
    imports: [
        CommonModule,
        SharedThemeModuleModule,
        RouterModule
    ],
  exports: [
    CardComponent,
    SharedThemeModuleModule
  ]
})
export class SharedModule {
}
