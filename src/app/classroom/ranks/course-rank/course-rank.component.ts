import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserRankService} from '../../../shared/services/user-rank.service';
import {IUserRank, RankTableColumn} from '../../../shared/models/user-rank.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-course-rank',
  templateUrl: './course-rank.component.html',
  styleUrls: ['./course-rank.component.scss']
})
export class CourseRankComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  @Input() courseRank: IUserRank[];
  rankColumns = RankTableColumn;

  constructor() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }


}
