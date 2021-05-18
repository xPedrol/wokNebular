import {Component, OnDestroy, OnInit} from '@angular/core';
import {IModuleTopic} from '../../shared/models/module-topic.model';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IReportResults} from '../../shared/models/module-topic-user-result.model';
import {SharedFunctions} from '../../shared/shared.functions';
import {UserService} from '../../shared/services/user.service';
import {IUserTopicResult} from '../../shared/models/user/user-topic-result.model';

@Component({
  selector: 'app-classroom-module',
  templateUrl: './classroom-module.component.html',
  styleUrls: ['./classroom-module.component.scss']
})
export class ClassroomModuleComponent implements OnInit, OnDestroy {
  selectedTopic: IModuleTopic;
  selectedTResults: IUserTopicResult;
  authorities: Authority[];
  moduleTopics: IModuleTopic[][];
  subject$ = new Subject();
  routePrefix = '/';
  isTeacher = false;
  courseSlug: string;
  disciplineSlug: string;
  loadingTopicResults = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private sF: SharedFunctions
  ) {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    if (this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.activatedRoute.data.pipe(takeUntil(this.subject$)).subscribe(({moduleTopics}) => {
      this.moduleTopics = moduleTopics;
    });
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  selectTopic(event) {
    this.selectedTResults = undefined;
    this.selectedTopic = event;
    if (!this.isTeacher) {
      this.getTopicResult();
    }
  }

  getTopicResult(): void {
    if (this.selectedTopic && this.selectedTopic.id) {
      this.loadingTopicResults = true;
      this.userService.getTopicResult(this.selectedTopic.id).pipe(takeUntil(this.subject$)).subscribe((result) => {
        this.selectedTResults = result || undefined;
        this.loadingTopicResults = false;
      }, () => this.loadingTopicResults = false);
    }
  }
}
