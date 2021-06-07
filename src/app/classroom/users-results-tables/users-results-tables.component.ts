import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {IReportResults} from '../../shared/models/module-topic-user-result.model';
import {Authority} from '../../shared/constants/authority.constants';
import {takeUntil} from 'rxjs/operators';
import {IUserTeamBasic} from '../../shared/models/basic/userTeam-basic.model';

@Component({
  selector: 'app-users-results-tables',
  templateUrl: './users-results-tables.component.html',
  styleUrls: ['./users-results-tables.component.scss']
})
export class UsersResultsTablesComponent implements OnInit, OnDestroy {
  subject = new Subject();
  @Input() authorities: Authority[];
  @Input() moduleId: number;
  usersResults: IReportResults[][];
  loadingResults = true;
  options = {size: 2, page: 0};
  userTeams: IUserTeamBasic[];
  loadingUserTeams = false;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUsersResults();
  }

  ngOnDestroy(): void {
    this.subject.complete();
    this.subject.next();
  }

  getUsersResults() {
    this.loadingResults = true;
    this.userService.getReportResultsByModule(this.authorities, this.moduleId, this.options).pipe(takeUntil(this.subject))
      .subscribe((results) => {
        if (this.usersResults && this.usersResults.length > 0) {
          this.usersResults = [...this.usersResults, ...results];
        } else {
          this.usersResults = results || [];
        }
        this.loadingResults = false;
      }, () => this.loadingResults = false);
  }

  updateResults() {
    if (!this.loadingResults) {
      this.options.page++;
      this.getUsersResults();
    }
  }

  getUserTeams(): void {
    this.loadingUserTeams = true;
    this.userService.getUserTeamsByAccount().subscribe((userTeams) => {
      this.userTeams = userTeams;
      this.loadingUserTeams = false;
    }, () => this.loadingUserTeams = false);
  }
}
