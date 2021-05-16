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
import {IModuleTopic, ModuleTopic} from '../../shared/models/module-topic.model';
import {ModuleTopicService} from '../../shared/services/module-topic.service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {NbToastrService} from '@nebular/theme';

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
  loadingMTs = true;
  loadingMTEs = true;
  subject = new Subject();
  routePrefix = '/';
  moduleTopics: IModuleTopic[];
  mTExercises: IModuleTopicExercise[];
  totalExercisesBylevel: any = {};

  constructor(
    private moduleService: ModuleService,
    private moduleTopicService: ModuleTopicService,
    private mTEService: ModuleTopicExerciseService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
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
        this.getModuleTopics();
        this.getModuleTopicExercises(this.module.id);
      }, () => this.loadingModule = false);
  }

  getModuleTopics(): void {
    this.loadingMTs = true;
    this.moduleTopicService.getModuleTopics(this.authorities, this.courseSlug, this.disciplineSlug, true).pipe(takeUntil(this.subject))
      .subscribe((mTs) => {
        this.moduleTopics = (mTs || []) as IModuleTopic[];
        this.loadingMTs = false;
        console.warn(this.moduleTopics);
      }, () => this.loadingMTs = false);
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

  synchronizeMTsDates(): void {
    this.moduleTopics = ModuleTopic.synchronizeMTsDates(this.moduleTopics, this.module?.course?.startDate, this.module?.course?.endTime);
    this.moduleTopics?.forEach((moduleTopic) => {
      const moduleTopicDates = {
        activeTime: moduleTopic?.activeTime,
        deactiveTime: moduleTopic?.deactiveTime,
        startTime: moduleTopic?.startTime,
        endTime: moduleTopic?.endTime,
        freezeTime: moduleTopic?.freezeTime,
        unfreezeTime: moduleTopic?.unfreezeTime,
        moduleTopicId: moduleTopic?.id,
      };
      this.moduleTopicService
        .synchronizeMTDates(
          this.authorities,
          moduleTopicDates
        )
        .subscribe({
          next: () => this.toastService.show('', 'Registrado com sucesso', {status: 'success'})
        });
    });
  }

}
