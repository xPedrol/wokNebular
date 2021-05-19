import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SharedFunctions} from '../../shared/shared.functions';
import {Authority} from '../../shared/constants/authority.constants';
import {ModuleTopicService} from '../../shared/services/module-topic.service';
import {IModuleTopic, ModuleTopic} from '../../shared/models/module-topic.model';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DATE_TIME_FORMAT} from '../../shared/constants/input.constants';
import {NbToastrService} from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'app-module-topic-manager',
  templateUrl: './module-topic-manager.component.html',
  styleUrls: ['./module-topic-manager.component.scss']
})
export class ModuleTopicManagerComponent implements OnInit, OnDestroy {
  subject = new Subject();
  courseSlug: string;
  disciplineSlug: string;
  topicSlug: string;
  authorities: Authority[];
  moduleTopic: IModuleTopic;
  loadingMT = true;
  routePrefix = '/';
  mTForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moduleTopicService: ModuleTopicService,
    private sF: SharedFunctions,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.authorities = this.activatedRoute.snapshot.data.authorities;
    this.routePrefix += this.sF.routeAuthSwitch(this.authorities, true);
    this.courseSlug = this.activatedRoute.snapshot.params.courseSlug;
    this.disciplineSlug = this.activatedRoute.snapshot.params.disciplineSlug;
    this.topicSlug = this.activatedRoute.snapshot.params.topicSlug;
    this.getModuleTopicBySlugs();
  }

  ngOnDestroy(): void {
    this.subject.complete();
    this.subject.next();
  }

  getModuleTopicBySlugs() {
    this.loadingMT = true;
    this.moduleTopicService.getModuleTopicBySlugs(this.authorities, this.courseSlug, this.disciplineSlug, this.topicSlug)
      .pipe(takeUntil(this.subject)).subscribe((mT) => {
      this.moduleTopic = mT || undefined;
      this.loadingMT = false;
      this.mTForm = new FormGroup({
        minScore: new FormControl(null, [Validators.required]),
        maxGrade: new FormControl(null, [Validators.required]),
        targetScore: new FormControl(null, [Validators.required]),
        itemorder: new FormControl(null, [Validators.required]),
        activeTime: new FormControl(null, [Validators.required]),
        deactiveTime: new FormControl(null, [Validators.required]),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        freezeTime: new FormControl(null, [Validators.required]),
        unfreezeTime: new FormControl(null, [Validators.required]),
        activated: new FormControl(false)
      });
      this.updateForm();
    }, () => this.loadingMT = false);
  }

  saveModuleTopic() {
    this.updateModuleTopicObj();
    this.moduleTopicService.update(this.authorities, this.moduleTopic).subscribe((mT) => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
    });
  }

  updateForm() {
    this.mTForm.get('minScore').setValue(this.moduleTopic.minScore);
    this.mTForm.get('maxGrade').setValue(this.moduleTopic.maxGrade);
    this.mTForm.get('targetScore').setValue(this.moduleTopic.targetScore);
    this.mTForm.get('itemorder').setValue(this.moduleTopic.itemorder);
    this.mTForm.get('activeTime').setValue(this.moduleTopic.activeTime.format(DATE_TIME_FORMAT));
    this.mTForm.get('deactiveTime').setValue(this.moduleTopic.deactiveTime.format(DATE_TIME_FORMAT));
    this.mTForm.get('startTime').setValue(this.moduleTopic.startTime.format(DATE_TIME_FORMAT));
    this.mTForm.get('endTime').setValue(this.moduleTopic.endTime.format(DATE_TIME_FORMAT));
    this.mTForm.get('freezeTime').setValue(this.moduleTopic.freezeTime.format(DATE_TIME_FORMAT));
    this.mTForm.get('unfreezeTime').setValue(this.moduleTopic.unfreezeTime.format(DATE_TIME_FORMAT));
    this.mTForm.get('activated').setValue(this.moduleTopic.activated ? this.moduleTopic.activated : false);
  }

  updateModuleTopicObj() {
    this.moduleTopic.minScore = this.mTForm.get('minScore').value;
    this.moduleTopic.maxGrade = this.mTForm.get('maxGrade').value;
    this.moduleTopic.targetScore = this.mTForm.get('targetScore').value;
    this.moduleTopic.itemorder = this.mTForm.get('itemorder').value;
    this.moduleTopic.activeTime = moment(this.mTForm.get('activeTime').value);
    this.moduleTopic.deactiveTime = moment(this.mTForm.get('deactiveTime').value);
    this.moduleTopic.startTime = moment(this.mTForm.get('startTime').value);
    this.moduleTopic.endTime = moment(this.mTForm.get('endTime').value);
    this.moduleTopic.freezeTime = moment(this.mTForm.get('freezeTime').value);
    this.moduleTopic.unfreezeTime = moment(this.mTForm.get('unfreezeTime').value);
    this.moduleTopic.activated = this.mTForm.get('activated').value;
  }

  synchronizeMTDates() {
    console.warn(this.moduleTopic.module.course);
    this.moduleTopic = ModuleTopic.synchronizeMTDates(
      this.moduleTopic,
      this.moduleTopic.module.course.startDate,
      this.moduleTopic.module.course.endTime
    );
    this.updateForm();
  }
}
