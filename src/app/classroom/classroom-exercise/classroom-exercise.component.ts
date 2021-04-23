import {Component, OnDestroy, OnInit} from '@angular/core';
import {Authority} from '../../shared/constants/authority.constants';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SharedFunctions} from '../../shared/shared.functions';
import {IModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {ModuleTopicExerciseService} from '../../shared/services/module-topic-exercise.service';
import {ISubmission} from '../../shared/models/submission.model';
import {ISolution} from '../../shared/models/solution.model';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../shared/services/user.service';
import {SolutionService} from '../../shared/services/solution.service';

@Component({
  selector: 'app-classroom-exercise',
  templateUrl: './classroom-exercise.component.html',
  styleUrls: ['./classroom-exercise.component.scss']
})
export class ClassroomExerciseComponent implements OnInit, OnDestroy {
  courseSlug: string;
  topicSlug: string;
  disciplineSlug: string;
  exerciseSlug: string;
  url: string;
  routePrefix = '/';
  isTeacher = false;
  loadingExercise = true;
  destroy$ = new Subject();
  authorities: Authority[];
  exercise: IModuleTopicExercise;
  submissions: ISubmission[];
  solutions: ISolution[];
  loadingContent = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sF: SharedFunctions,
    private mTEService: ModuleTopicExerciseService,
    private userService: UserService,
    private solutionService: SolutionService
  ) {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    if (this.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.exerciseSlug = this.activatedRoute.snapshot.params.exerciseSlug;
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
    this.topicSlug = this.activatedRoute.snapshot.params.topicSlug;
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.getModuleTopicExercise();
    if (this.isTeacher) {
      this.getSolutions();
    } else {
      this.getSubmissions();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getModuleTopicExercise(): void {
    this.loadingExercise = true;
    this.mTEService.getModuleTopicExercise(
      this.authorities,
      this.courseSlug,
      this.disciplineSlug,
      this.topicSlug,
      this.exerciseSlug).pipe(takeUntil(this.destroy$))
      .subscribe((exercise) => {
        this.exercise = exercise || null;
        this.loadingExercise = false;
      }, () => this.loadingExercise = false);
  }

  getSubmissions(): void {
    this.loadingContent = true;
    this.userService.getSubmissionByExercise(
      this.authorities,
      this.courseSlug,
      this.disciplineSlug,
      this.topicSlug,
      this.exerciseSlug).pipe(takeUntil(this.destroy$))
      .subscribe((submissions) => {
        this.submissions = submissions || [];
        this.loadingContent = false;
      }, () => this.loadingContent = false);
  }

  getSolutions(): void {
    this.loadingContent = true;
    this.solutionService.getSolutions(this.authorities, this.exerciseSlug).pipe(takeUntil(this.destroy$))
      .subscribe((solutions) => {
        this.solutions = solutions || [];
        this.loadingContent = false;
      }, () => this.loadingContent = false);
  }

}
