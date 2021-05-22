import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {ITopic} from '../../shared/models/topic.model';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {SharedFunctions} from '../../shared/shared.functions';
import {ModuleTopicService} from '../../shared/services/module-topic.service';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../shared/services/user.service';
import {IUserExerciseResult} from '../../shared/models/user/user-exercise-result.model';
import {IExerciseBasic} from '../../shared/models/basic/exercise-basic.model';
import {ModuleTopicExerciseService} from '../../shared/services/module-topic-exercise.service';

@Component({
  selector: 'app-classroom-topic',
  templateUrl: './classroom-topic.component.html',
  styleUrls: ['./classroom-topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassroomTopicComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  topic: ITopic;
  authorities: Authority[];
  exerciseResults: IUserExerciseResult[];
  exercises: IExerciseBasic[];
  courseSlug: string;
  topicSlug: string;
  disciplineSlug: string;
  url: string;
  routePrefix = '/';
  isTeacher = false;
  loadingExercise = true;
  loadingTopic = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sF: SharedFunctions,
    private topicService: ModuleTopicService,
    private userService: UserService,
    private moduleTExerciseService: ModuleTopicExerciseService
  ) {
    this.sF.setPageData('Tópico');
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    if (this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
    this.topicSlug = this.activatedRoute.snapshot.params.topicSlug;
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.url = `/${this.sF.routeAuthSwitch(this.activatedRoute.snapshot.data.authorities, true)}classroom/course/${this.courseSlug}/module/${this.disciplineSlug}/topic/${this.topicSlug}/exercise`;
    this.getTopic();
    if (!this.isTeacher) {
      this.getUserResults();
    } else {
      this.getBasicExercises();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTopic() {
    this.loadingTopic = true;
    this.topicService.getTopic(this.authorities, this.disciplineSlug, this.topicSlug).pipe(takeUntil(this.destroy$))
      .subscribe((topic) => {
        this.topic = topic;
        this.sF.setPageData(this.topic?.name);
        this.loadingTopic = false;
      }, () => this.loadingTopic = false);
  }

  getUserResults(): void {
    if (this.disciplineSlug && this.topicSlug) {
      this.loadingExercise = true;
      this.userService
        .getExercisesResult(this.courseSlug, this.disciplineSlug, this.topicSlug)
        .subscribe((exerciseResults) => {
          this.exerciseResults = exerciseResults || [];
          this.loadingExercise = false;
        }, () => this.loadingExercise = false);
    }
  }

  getBasicExercises(): void {
    if (this.disciplineSlug && this.topicSlug) {
      this.moduleTExerciseService
        .getBasicExercise(this.authorities, this.disciplineSlug, this.topicSlug)
        .subscribe((exercises) => {
          this.exercises = exercises || [];
          this.loadingExercise = false;
        }, () => this.loadingExercise = false);
    }
  }
}
