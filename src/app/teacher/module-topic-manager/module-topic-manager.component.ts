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
import {ICoursebasic} from '../../shared/models/basic/course-basic.model';
import {CourseService} from '../../shared/services/course.service';
import {IModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {ModuleTopicExerciseService} from '../../shared/services/module-topic-exercise.service';
import {ITopic} from '../../shared/models/topic.model';

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
  course: ICoursebasic;
  mTEs: IModuleTopicExercise[];
  loadingMTEs = true;
  topic: ITopic;
  loadingTopic = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moduleTopicService: ModuleTopicService,
    private courseService: CourseService,
    private sF: SharedFunctions,
    private toastService: NbToastrService,
    private moduleTopicExerciseService: ModuleTopicExerciseService
  ) {
    this.sF.setPageData('Tópico');
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
      this.sF.setPageData(this.moduleTopic?.topic?.name);
      // this.getModuleTopicExercisesByModuleTopicId();
      this.mTForm = new FormGroup({
        minScore: new FormControl(null, [Validators.required]),
        maxGrade: new FormControl(null, [Validators.required]),
        targetScore: new FormControl(null, [Validators.required]),
        itemorder: new FormControl(null, [Validators.required]),
        activeTime: new FormControl(null, [
          Validators.required
        ]),
        deactiveTime: new FormControl(null, [Validators.required]),
        startTime: new FormControl(null, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        freezeTime: new FormControl(null, [Validators.required]),
        unfreezeTime: new FormControl(null, [Validators.required]),
        activated: new FormControl(false)
      });
      this.findBasicCourseByModuleId();
      this.updateForm();
    }, () => this.loadingMT = false);
  }

  getTopic(): void {
    this.loadingTopic = true;
    this.moduleTopicService.getTopicByModuleTopicId(this.moduleTopic?.id).subscribe((topic) => {
      this.topic = topic || undefined;
      this.loadingTopic = false;
    }, () => this.loadingTopic = false);
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
    this.moduleTopic = ModuleTopic.synchronizeMTDates(
      this.moduleTopic,
      this.course.startDate,
      this.course.endTime
    );
    this.updateForm();
  }

  findBasicCourseByModuleId(): void {
    this.courseService.findBasicCourseByModuleId(this.moduleTopic?.module?.id).subscribe((course) => {
      this.course = course || undefined;
      this.loadingMT = false;
    }, () => this.loadingMT = false);
  }

  getModuleTopicExercisesByModuleTopicId(): void {
    this.loadingMTEs = true;
    this.moduleTopicExerciseService.getModuleTopicExercisesByModuleTopicId(this.moduleTopic?.id).subscribe((mTEs) => {
      this.mTEs = mTEs || [];
      this.loadingMTEs = false;
    }, () => this.loadingMTEs = false);
  }

  // startTimeValidation = (startTime: FormControl): any => {
  //   if (this.mTForm && startTime.value) {
  //     const starTimeF = moment(startTime.value, DATE_TIME_FORMAT);
  //     const {endTime, activeTime, deactiveTime, freezeTime, unfreezeTime} = this.fomartDates();
  //     if (
  //       !starTimeF?.isBefore(endTime) ||
  //       !starTimeF.isBetween(activeTime, deactiveTime) ||
  //       !starTimeF?.isBefore(freezeTime) ||
  //       !starTimeF?.isBefore(unfreezeTime)
  //     ) {
  //       console.warn('aaaaaa');
  //       return {
  //         invalidDate: true
  //       };
  //     }
  //   }
  //   return null;
  // };
  //
  // endTimeValidation = (endTime: FormControl): any => {
  //   if (this.mTForm && endTime.value) {
  //     const endTimeF = moment(endTime.value, DATE_TIME_FORMAT);
  //     const {startTime, activeTime, deactiveTime, freezeTime, unfreezeTime} = this.fomartDates();
  //     if (
  //       !endTimeF?.isAfter(startTime) ||
  //       !endTimeF.isBefore(deactiveTime) ||
  //       !endTimeF?.isAfter(activeTime) ||
  //       !endTimeF?.isAfter(unfreezeTime) ||
  //       !endTimeF?.isAfter(freezeTime)
  //     ) {
  //       return {
  //         invalidDate: true
  //       };
  //     }
  //   }
  //   return null;
  // };
  //
  // activeTimeValidation = (activeTime: FormControl): any => {
  //   if (this.mTForm && activeTime.value) {
  //     const activeTimeF = moment(activeTime.value, DATE_TIME_FORMAT);
  //     const {startTime, endTime, deactiveTime} = this.fomartDates();
  //     if (
  //       !activeTimeF?.isBefore(startTime) ||
  //       !activeTimeF?.isBefore(deactiveTime) ||
  //       !activeTimeF?.isBefore(endTime)
  //     ) {
  //       return {
  //         invalidDate: true
  //       };
  //     }
  //   }
  //   return null;
  // };
  //
  // deactiveTimeValidation = (deactiveTime: FormControl): any => {
  //   if (this.mTForm && deactiveTime.value) {
  //     const deactiveTimeF = moment(deactiveTime.value, DATE_TIME_FORMAT);
  //     const {startTime, activeTime, endTime} = this.fomartDates();
  //     if (
  //       !deactiveTimeF?.isAfter(startTime) ||
  //       !deactiveTimeF?.isAfter(activeTime) ||
  //       !deactiveTimeF?.isAfter(endTime)
  //     ) {
  //       return {
  //         invalidDate: true
  //       };
  //     }
  //   }
  //   return null;
  // };
  //
  // freezeTimeValidation = (freezeTime: FormControl): any => {
  //   if (this.mTForm && freezeTime.value) {
  //     const freezeTimeF = moment(freezeTime.value, DATE_TIME_FORMAT);
  //     const {startTime, endTime, unfreezeTime} = this.fomartDates();
  //     if (
  //       !freezeTimeF?.isBetween(startTime, endTime) ||
  //       !freezeTimeF?.isBefore(unfreezeTime)
  //     ) {
  //       return {
  //         invalidDate: true
  //       };
  //     }
  //   }
  //   return null;
  // };
  //
  // unfreezeTimeValidation = (unfreezeTime: FormControl): any => {
  //   if (this.mTForm && unfreezeTime.value) {
  //     const unfreezeTimeF = moment(unfreezeTime.value, DATE_TIME_FORMAT);
  //     const {startTime, endTime, freezeTime} = this.fomartDates();
  //     if (
  //       !unfreezeTimeF?.isAfter(freezeTime) ||
  //       !unfreezeTimeF?.isBetween(startTime, endTime)
  //     ) {
  //       return {
  //         invalidDate: true
  //       };
  //     }
  //   }
  //   return null;
  // };

  fomartDates() {
    const startTime = moment(this.mTForm.get('startTime').value, DATE_TIME_FORMAT);
    const endTime = moment(this.mTForm.get('endTime').value, DATE_TIME_FORMAT);
    const activeTime = moment(this.mTForm.get('activeTime').value, DATE_TIME_FORMAT);
    const deactiveTime = moment(this.mTForm.get('deactiveTime').value, DATE_TIME_FORMAT);
    const freezeTime = moment(this.mTForm.get('freezeTime').value, DATE_TIME_FORMAT);
    const unfreezeTime = moment(this.mTForm.get('unfreezeTime').value, DATE_TIME_FORMAT);
    return {startTime, endTime, activeTime, deactiveTime, freezeTime, unfreezeTime};
  }

  verifyDate(input: string[]): boolean {
    const {startTime, activeTime, deactiveTime, freezeTime, unfreezeTime, endTime} = this.fomartDates();

    if (input.includes('startTime')) {
      if (
        !startTime?.isBefore(endTime) ||
        !startTime.isBetween(activeTime, deactiveTime) ||
        !startTime?.isBefore(freezeTime) ||
        !startTime?.isBefore(unfreezeTime)
      ) {
        return false;
      }
    }
    if (input.includes('endTime')) {
      if (
        !endTime?.isAfter(startTime) ||
        !endTime.isBefore(deactiveTime) ||
        !endTime?.isAfter(activeTime) ||
        !endTime?.isAfter(unfreezeTime) ||
        !endTime?.isAfter(freezeTime)
      ) {
        return false;
      }
    }
    if (input.includes('activeTime')) {
      if (
        !activeTime?.isBefore(startTime) ||
        !activeTime?.isBefore(deactiveTime) ||
        !activeTime?.isBefore(endTime)
      ) {
        return false;
      }
    }
    if (input.includes('deactiveTime')) {
      if (
        !deactiveTime?.isAfter(startTime) ||
        !deactiveTime?.isAfter(activeTime) ||
        !deactiveTime?.isAfter(endTime)
      ) {
        return false;
      }
    }
    if (input.includes('unfreezeTime')) {
      if (
        !unfreezeTime?.isAfter(freezeTime) ||
        !unfreezeTime?.isBetween(startTime, endTime)
      ) {
        return false;
      }
    }
    if (input.includes('freezeTime')) {
      if (
        !freezeTime?.isBetween(startTime, endTime) ||
        !freezeTime?.isBefore(unfreezeTime)
      ) {
        return false;
      }
    }
    return true;
  }

  changeTab(event: any): void {
    if (event.tabId === 1) {
      this.getTopic();
    }
  }
}
