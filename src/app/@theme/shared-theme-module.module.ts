import {NgModule} from '@angular/core';
import {
  NbActionsModule, NbAlertModule, NbAutocompleteModule, NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule,
  NbLayoutModule, NbListModule,
  NbMenuModule, NbProgressBarModule,
  NbSearchModule, NbSelectModule, NbSpinnerModule, NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

@NgModule({

  exports: [
    NbLayoutModule,
    NbMenuModule,
    NbCardModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbProgressBarModule,
    NbListModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbAutocompleteModule
  ]
})
export class SharedThemeModuleModule {
}
