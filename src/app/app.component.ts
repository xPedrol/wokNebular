import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SharedFunctions} from './shared/shared.functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private sF: SharedFunctions
  ) {
    this.sF.setTheme();
    translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang('pt');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('pt');
  }


}
