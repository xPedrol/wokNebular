import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {ICompleteUser} from '../../shared/models/user/complete-user.model';
import {takeUntil} from 'rxjs/operators';
import {IUserProfileStatistics} from '../../shared/models/user/user-profile-statistics.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  user: ICompleteUser;
  userStatistics: IUserProfileStatistics;
  loadingUser = true;
  loadingUserStatistics = true;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getCompleteUser();
    this.getUserProfileStatistics();
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  getCompleteUser(): void {
    this.loadingUser = true;
    this.userService.getCompleteUser().pipe(takeUntil(this.subject$)).subscribe(user => {
      this.loadingUser = false;
      this.user = user;
    }, () => this.loadingUser = false);
  }

  getUserProfileStatistics(): void {
    this.loadingUserStatistics = true;
    this.userService.getUserProfileStatistics().subscribe((statistics) => {
      this.loadingUserStatistics = false;
      this.userStatistics = statistics;
    }, () => this.loadingUserStatistics = false);
  }
}
