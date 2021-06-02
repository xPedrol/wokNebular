import {Injectable} from '@angular/core';
import {AccountService} from './services/account.service';
import {Authority} from './constants/authority.constants';
import {RoutePrefix} from './constants/route-prefix';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctions {

  constructor(
    public accountService: AccountService,
    private titleService: Title,
    private meta: Meta
  ) {
  }

  routeAuthSwitch(authorities: Authority[] | string[], noApi = false): RoutePrefix {
    if (authorities) {
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
}
