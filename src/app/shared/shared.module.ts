import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {RouterModule} from '@angular/router';
import {SharedFunctions} from './shared.functions';
import {EchartsLineComponent} from './components/echarts/echarts-line.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {EchartsBarComponent} from './components/echarts/echarts-bar.component';
// import {SmartTableComponent} from './components/smart-table/smart-table.component';
// import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NotFoundCardComponent} from './components/not-found-card/not-found-card.component';
import {ChangedUserAlertComponent} from './components/changed-user-alert/changed-user-alert.component';


@NgModule({
  declarations: [
    CardComponent,
    AccessDeniedComponent,
    EchartsLineComponent,
    EchartsBarComponent,
    // SmartTableComponent,
    NotFoundCardComponent,
    ChangedUserAlertComponent
  ],
  imports: [
    CommonModule,
    SharedThemeModuleModule,
    RouterModule,
    NgxEchartsModule,
    // Ng2SmartTableModule
  ],
  providers: [SharedFunctions],
  exports: [
    CardComponent,
    SharedThemeModuleModule,
    EchartsLineComponent,
    EchartsBarComponent,
    // SmartTableComponent,
    NotFoundCardComponent,
    ChangedUserAlertComponent
  ]
})
export class SharedModule {
}
