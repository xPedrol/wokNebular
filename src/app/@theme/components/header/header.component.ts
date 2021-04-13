import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

// import { UserData } from '../../../@core/data/users';
// import { LayoutService } from '../../../@core/utils';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  items = [
    {title: 'default'},
    {title: 'dark'},
    {title: 'cosmic'},
    {title: 'corporate'}
  ];
  userPictureOnly = false;
  user: any;

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

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              // private userService: UserData,
              // private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
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
        filter(({tag}) => tag === 'userMenu'),
        map(({item: {title}}) => title),
      )
      .subscribe((menu) => {
        if (menu === 'Profile') {
          this.router.navigate(['/account/profile']);
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
