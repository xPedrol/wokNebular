import {Injectable} from '@angular/core';
import {AccountService} from './services/account.service';
import {Authority} from './constants/authority.constants';
import {RoutePrefix} from './constants/route-prefix';
import {Meta, Title} from '@angular/platform-browser';
import * as moment from 'moment';
import {themes} from './constants/themes.constants';
import {CookieService} from 'ngx-cookie';
import {NbThemeService} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctions {

  constructor(
    public accountService: AccountService,
    private titleService: Title,
    private meta: Meta,
    private themeService: NbThemeService,
    private cookieService: CookieService
  ) {
  }

  routeAuthSwitch(authorities: Authority[] | string[], noApi = false): RoutePrefix {
    if (authorities && this.accountService.account) {
      if (authorities.includes(Authority.TEACHER)) {
        if (this.accountService.account.isTeacher()) {
          return RoutePrefix.TEACHER;
        }
      } else if (authorities.includes(Authority.USER)) {
        if (this.accountService.account.isStudent()) {
          if (noApi) {
            return RoutePrefix.STUDENT_NO_API;
          }
          return RoutePrefix.STUDENT;
        }
      }
    }
    return RoutePrefix.UNSET;
  }

  isChangedUser(authorities: Authority[]): boolean {
    return !authorities.includes(Authority.TEACHER) && this.accountService.account.isTeacher();
  }

  setPageData(title?: string): void {
    if (!title) {
      title = 'Mundo do código';
    } else {
      title = `WOK - ${title}`;
    }
    this.titleService.setTitle(title);
    this.meta.updateTag({name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({name: 'twitter:site', content: '@content'});
    this.meta.updateTag({name: 'twitter:title', content: title});
    this.meta.updateTag({name: 'twitter:description', content: 'teste'});
    this.meta.updateTag({name: 'twitter:image', content: 'https://veja.abril.com.br/wp-content/uploads/2019/12/amazonia-floresta-coraccca7ao.jpg.jpg'});
    this.meta.updateTag({property: 'og:type', content: 'article'});
    this.meta.updateTag({property: 'og:site_name', content: 'content'});
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({property: 'og:description', content: 'descricao top'});
    this.meta.updateTag({property: 'og:image', content: 'https://veja.abril.com.br/wp-content/uploads/2019/12/amazonia-floresta-coraccca7ao.jpg.jpg'});

    // this.meta.updateTag({property: 'og:url', content: `https://www.example.com/${config.slug}`});
  }

  setTheme(): void {
    const date = new Date(moment().add(12, 'months').format('YYYY-MM-DD'));
    if (this.cookieService.get('theme') && themes.includes(this.cookieService.get('theme'))) {
      this.cookieService.put('theme', this.cookieService.get('theme'), {expires: date});
    } else {
      this.cookieService.put('theme', 'default', {expires: date});
    }
    this.themeService.changeTheme(this.cookieService.get('theme'));
  }

  changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
    const date = new Date(moment().add(12, 'months').format('YYYY-MM-DD'));
    this.cookieService.put('theme', themeName, {expires: date});
  }
}
