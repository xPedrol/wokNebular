import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SharedFunctions} from '../../shared/shared.functions';
import {Authority} from '../../shared/constants/authority.constants';
import {ModuleTopicService} from '../../shared/services/module-topic.service';
import {IModuleTopic} from '../../shared/models/module-topic.model';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DATE_TIME_FORMAT} from '../../shared/constants/input.constants';

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
    private sF: SharedFunctions
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
}
