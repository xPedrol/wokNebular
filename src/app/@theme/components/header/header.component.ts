import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AccountService} from '../../../shared/services/account.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Authority} from '../../../shared/constants/authority.constants';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  authorities: Authority[];
  private destroy$: Subject<void> = new Subject<void>();
  items = [
    {title: 'default'},
    {title: 'dark'},
    {title: 'cosmic'},
    {title: 'corporate'}
  ];
  languagesAction = [
    {title: 'Loading'}
  ];
  userPictureOnly = false;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{title: 'Perfil', id: 0}, {title: 'Sair', id: 1}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              public authService: AuthService,
              public accountService: AccountService,
              // private userService: UserData,
              // private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,
              private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.getTranslationActions();
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'themeMenu'),
        map(({item: {title}}) => title),
      )
      .subscribe((theme) => {
        this.changeTheme(theme);
      });
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'languageMenu'),
        map((item: any) => item),
      )
      .subscribe(({item}) => {
        if (item.initials) {
          this.translateService.use(item.initials);
          this.getTranslationActions();
        }
      });
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'userMenu'),
        map(({item: {title}}) => title),
      )
      .subscribe((menu: any) => {
        if (menu.id === 0) {
          this.router.navigate(['/account/profile']);
        }
        if (menu.id === 1) {
          this.authService.logout();
        }
      });
    this.currentTheme = this.themeService.currentTheme;
    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTranslationActions(): void {
    this.translateService.get('languages').subscribe((languagesT: any[]) => {
      this.languagesAction = [];
      if (languagesT && languagesT?.length > 0) {
        languagesT?.forEach((language, i) => {
          // @ts-ignore
          this.languagesAction.push({title: language.name, initials: language.initials, id: i});
        });
      }
    });
  }

  changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
