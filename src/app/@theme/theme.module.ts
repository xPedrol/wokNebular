import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule, NbWindowModule,
} from '@nebular/theme';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';
import {SharedThemeModuleModule} from './shared-theme-module.module';

const NB_MODULES = [
//   NbLayoutModule,
  NbMenuModule.forRoot(),
//   NbCardModule,
//   NbUserModule,
//   NbActionsModule,
//   NbSearchModule,
  NbSidebarModule.forRoot(),
  NbWindowModule.forRoot(),
//   NbContextMenuModule,
//   NbButtonModule,
//   NbSelectModule,
//   NbIconModule,
//   NbEvaIconsModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, SharedThemeModuleModule, NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS, SharedThemeModuleModule, NbSidebarModule, NB_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
      ],
    };
  }
}
