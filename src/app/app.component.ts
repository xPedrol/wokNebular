import {Component} from '@angular/core';
import {SharedFunctions} from './shared/shared.functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wok';

  constructor(
    private sF: SharedFunctions
  ) {
  }
}
