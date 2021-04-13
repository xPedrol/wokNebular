import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedThemeModuleModule} from '../@theme/shared-theme-module.module';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedThemeModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule {
}
