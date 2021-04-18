import {Component, OnDestroy, OnInit} from '@angular/core';
import {IModuleTopic} from '../../shared/models/module-topic.model';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IReportResults} from '../../shared/models/module-topic-user-result.model';

@Component({
  selector: 'app-classroom-module',
  templateUrl: './classroom-module.component.html',
  styleUrls: ['./classroom-module.component.scss']
})
export class ClassroomModuleComponent implements OnInit, OnDestroy {
  selectedTopic: IModuleTopic;
  selectedTResults: IReportResults;
  authorities: Authority[];
  moduleTopics: IModuleTopic[][];
  isTeacher = false;
  subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.pipe(takeUntil(this.subject$)).subscribe(({moduleTopics}) => {
      this.moduleTopics = moduleTopics;
    });
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    if (this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  selectTopic(event) {
    this.selectedTopic = event;
  }
}
