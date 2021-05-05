import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModuleService} from '../../shared/services/module.service';
import {IModule} from '../../shared/models/module.model';
import {Authority} from '../../shared/constants/authority.constants';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SharedFunctions} from '../../shared/shared.functions';
import {IModuleTopicExercise, ModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {ModuleTopicExerciseService} from '../../shared/services/module-topic-exercise.service';

@Component({
  selector: 'app-module-manager',
  templateUrl: './module-manager.component.html',
  styleUrls: ['./module-manager.component.scss']
})
export class ModuleManagerComponent implements OnInit, OnDestroy {
  module: IModule;
  authorities: Authority[];
  courseSlug: string;
  disciplineSlug: string;
  loadingModule = true;
  loadingMTEs = true;
  subject = new Subject();
  routePrefix = '/';
  mTExercises: IModuleTopicExercise[];
  totalExercisesBylevel: any = {};

  constructor(
    private moduleService: ModuleService,
    private mTEService: ModuleTopicExerciseService,
    private activatedRoute: ActivatedRoute,
    private sF: SharedFunctions
  ) {
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

  ngOnInit(): void {
    this.getParams();
    this.getModule();
  }

  getParams(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
  }

  getModule(): void {
    this.loadingModule = true;
    this.moduleService.getModule(this.authorities, this.courseSlug, this.disciplineSlug).pipe(takeUntil(this.subject))
      .subscribe((module) => {
        this.module = module;
        this.loadingModule = false;
        this.getModuleTopicExercises(this.module.id);
      }, () => this.loadingModule = false);
  }

  getModuleTopicExercises(moduleId: number): void {
    this.loadingMTEs = true;
    this.mTEService.getModuleTopicExercisesByModuleId(moduleId).pipe(takeUntil(this.subject))
      .subscribe((mTEs) => {
        this.mTExercises = mTEs || [];
        this.totalExercisesBylevel = ModuleTopicExercise.countExercisesByLevel(this.mTExercises);
        this.loadingMTEs = false;
      }, () => this.loadingMTEs = false);
  }
}
