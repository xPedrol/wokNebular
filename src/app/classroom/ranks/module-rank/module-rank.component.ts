import {Component, Input, OnInit} from '@angular/core';
import {IUserRank, RankTableColumn} from '../../../shared/models/user-rank.model';
import {takeUntil} from 'rxjs/operators';
import {UserRankService} from '../../../shared/services/user-rank.service';
import {Subject} from 'rxjs';
import {Authority} from '../../../shared/constants/authority.constants';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-module-rank',
  templateUrl: './module-rank.component.html',
  styleUrls: ['./module-rank.component.scss']
})
export class ModuleRankComponent implements OnInit {
  destroy$ = new Subject();
  @Input() moduleId: number;
  moduleRank: IUserRank[];
  loadingModuleRank = true;
  rankColumns = RankTableColumn;
  authorities: Authority[];

  constructor(
    private rankService: UserRankService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
  }

  ngOnInit(): void {
    this.getModuleRank();
  }

  getModuleRank(): void {
    this.rankService.getModuleRank(this.authorities, this.moduleId).pipe(takeUntil(this.destroy$)).subscribe((rank) => {
      this.moduleRank = rank || null;
      this.loadingModuleRank = false;
    }, () => {
      this.moduleRank = null;
      this.loadingModuleRank = false;
    });
  }
}
