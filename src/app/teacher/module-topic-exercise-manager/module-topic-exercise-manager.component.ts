import {Component, OnInit} from '@angular/core';
import {ModuleTopicExerciseScenarioService} from '../../shared/services/module-topic-exercise-scenario.service';
import {IModuleTopicExerciseScenario} from '../../shared/models/module-topic-exercise-scenario.model';
import {IModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {ModuleTopicExerciseService} from '../../shared/services/module-topic-exercise.service';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';
import {SharedFunctions} from '../../shared/shared.functions';
import {ISubmission} from '../../shared/models/submission.model';
import {SubmissionService} from '../../shared/services/submission.service';

@Component({
  selector: 'app-module-topic-exercise-manager',
  templateUrl: './module-topic-exercise-manager.component.html',
  styleUrls: ['./module-topic-exercise-manager.component.scss']
})
export class ModuleTopicExerciseManagerComponent implements OnInit {
  scenarios: IModuleTopicExerciseScenario[];
  submissions: ISubmission[];
  mTExercise: IModuleTopicExercise;
  authorities: Authority[];
  routePrefix = '/';
  courseSlug: string;
  disciplineSlug: string;
  topicSlug: string;
  exerciseSlug: string;
  loadingMTE = true;
  loadingScenario = true;
  loadingSubmission = true;

  constructor(
    private mTEScenarioService: ModuleTopicExerciseScenarioService,
    private moduleTopicExerciseService: ModuleTopicExerciseService,
    private activatedRoute: ActivatedRoute,
    private sF: SharedFunctions,
    private submissionService: SubmissionService
  ) {
    this.sF.setPageData('Exercício');
  }

  ngOnInit(): void {
    this.getParams();
    this.getModuleTopicExercise();
  }

  getParams(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
    this.topicSlug = this.activatedRoute.snapshot.params.topicSlug;
    this.exerciseSlug = this.activatedRoute.snapshot.params.exerciseSlug;
  }

  getModuleTopicExerciseScenarioByMTEId(): void {
    this.loadingScenario = true;
    this.mTEScenarioService.getModuleTopicExerciseScenarioByMTEId(this.mTExercise.id).subscribe((scenarios) => {
      this.scenarios = scenarios || [];
      this.loadingScenario = false;
    }, () => this.loadingScenario = false);
  }

  getModuleTopicExercise(): void {
    this.loadingMTE = true;
    this.moduleTopicExerciseService.getModuleTopicExercise(
      this.authorities,
      this.courseSlug,
      this.disciplineSlug,
      this.topicSlug,
      this.exerciseSlug
    ).subscribe((exercise) => {
      this.mTExercise = exercise || undefined;
      this.getSubmissions();
      this.sF.setPageData(this.mTExercise?.exercise?.name);
      this.loadingMTE = false;
      this.getModuleTopicExerciseScenarioByMTEId();
    }, () => this.loadingMTE = false);
  }

  getSubmissions(): void {
    this.loadingSubmission = true;
    this.submissionService.getSubmissionsBySlugs(this.authorities, this.mTExercise.id).subscribe((submissions) => {
      this.submissions = submissions || [];
      console.warn(submissions);
      this.loadingSubmission = false;
    }, () => this.loadingSubmission = false);
  }

  changeTab(event: any): void {

  }
}
