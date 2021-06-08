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
  @Input() courseId: number;
  usersResults: IReportResults[][];
  usersResultsFiltered: IReportResults[][];
  loadingResults = true;
  options = {size: 2, page: 0};
  userTeams: IUserTeamBasic[];
  loadingUserTeams = false;
  userTeam: IUserTeamBasic;

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
        this.usersResultsFiltered = this.usersResults;
        this.loadingResults = false;
      }, () => this.loadingResults = false);
  }

  updateResults() {
    if (!this.loadingResults && !this.userTeam) {
      this.options.page++;
      this.getUsersResults();
    }
  }

  getUserTeams(): void {
    this.loadingUserTeams = true;
    this.userService.getUserTeamsByCourse(this.courseId).subscribe((userTeams) => {
      this.userTeams = userTeams;
      this.loadingUserTeams = false;
    }, () => this.loadingUserTeams = false);
  }

  filterUserResultsByUser(): void {
    if (this.usersResults && this.usersResults?.length > 0 && this.userTeam) {
      let userRAux: IReportResults[][] = [];
      this.usersResults.forEach((userResults1, i) => {
        userRAux.push([]);
        if (userResults1 && userResults1?.length > 0) {
          userResults1.forEach((userResult) => {
            if (userResult.userId === this.userTeam?.user?.id) {
              userRAux[i].push(userResult);
            }
          });
        }
      });
      userRAux = userRAux.filter((userRs) => {
        if (!userRs || userRs.length === 0) {
          return null;
        }
        return userRs;
      });
      this.usersResultsFiltered = userRAux;
    }
  }

  cleanURFiltered(): void {
    this.usersResultsFiltered = this.usersResults;
    this.userTeam = undefined;
  }
}
