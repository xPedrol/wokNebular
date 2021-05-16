import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {IReportResults} from '../../shared/models/module-topic-user-result.model';
import {Authority} from '../../shared/constants/authority.constants';
import {takeUntil} from 'rxjs/operators';

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
    this.userService.getReportResultsByModule(this.authorities, this.moduleId).pipe(takeUntil(this.subject))
      .subscribe((results) => {
        this.usersResults = results || [];
        console.warn(this.usersResults);
      });
  }

}
