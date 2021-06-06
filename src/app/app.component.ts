import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbThemeService} from '@nebular/theme';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private themeService: NbThemeService,
    private sessionStorage: SessionStorageService
  ) {
    this.setTheme();
    translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang('pt');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('pt');
  }

  setTheme(): void {
    if (this.sessionStorage.retrieve('theme') !== this.themeService.currentTheme) {
      this.themeService.changeTheme(this.sessionStorage.retrieve('theme'));
    }
  }
}
