import {NgModule} from '@angular/core';
import {
  NbActionsModule, NbAlertModule, NbAutocompleteModule, NbBadgeModule, NbButtonGroupModule, NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbContextMenuModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule,
  NbLayoutModule, NbListModule,
  NbMenuModule, NbPopoverModule, NbProgressBarModule,
  NbSearchModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule,
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
    NbAutocompleteModule,
    NbBadgeModule,
    NbPopoverModule,
    NbTagModule,
    NbDatepickerModule,
    NbButtonGroupModule
  ]
})
export class SharedThemeModuleModule {
}
