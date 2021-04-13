import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';


@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    SharedThemeModuleModule
  ],
  exports: [
    CardComponent,
    SharedThemeModuleModule
  ]
})
export class SharedModule {
}
