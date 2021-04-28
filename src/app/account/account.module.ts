import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditUserComponent } from './profile/edit-user/edit-user.component';
import { EditPasswordComponent } from './profile/edit-password/edit-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { EditAboutDialogComponent } from './profile/edit-about-dialog/edit-about-dialog.component';
import {NgxMaskModule} from 'ngx-mask';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    EditUserComponent,
    EditPasswordComponent,
    EditAboutDialogComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgxMaskModule
    ]
})
export class AccountModule {
}
