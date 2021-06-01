import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {IModuleTopic, ModuleTopic} from '../../shared/models/module-topic.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DATE_TIME_FORMAT} from '../../shared/constants/input.constants';
import * as moment from 'moment';
import {ModuleTopicService} from '../../shared/services/module-topic.service';
import {Authority} from '../../shared/constants/authority.constants';
import {NbToastrService} from '@nebular/theme';
import {SharedFunctions} from '../../shared/shared.functions';

@Component({
  selector: 'app-edit-module-topics-table',
  templateUrl: './edit-module-topics-table.component.html',
  styleUrls: ['./edit-module-topics-table.component.scss']
})
export class EditModuleTopicsTableComponent implements OnInit {
  @Input() moduleTopics: IModuleTopic[];
  @Input() authorities: Authority[];
  selectedIndex: number;
  routePrefix = '/';
  selectedModuleTopic: IModuleTopic;
  mTForm: FormGroup;
  subject = new Subject();
  tableColumn = [
    {
      title: 'Ativo',
      class: 'text-left'
    },
    {
      title: 'Tópico',
      class: 'text-center'
    },
    {
      title: 'Pontuação max.',
      class: 'text-left'
    },
    {
      title: 'Pontuação min.',
      class: 'text-left'
    },
    {
      title: 'Média',
      class: 'text-left'
    },
    {
      title: 'Dt. ativação',
      class: 'text-left'
    },
    {
      title: 'Dt. desativação',
      class: 'text-left'
    },
    {
      title: '',
      class: 'text-left'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private moduleTopicService: ModuleTopicService,
    private toastService: NbToastrService,
    private sF: SharedFunctions
  ) {
  }


  ngOnInit(): void {
    this.routePrefix = this.sF.routeAuthSwitch(this.authorities, true);
    // this.mTForm = new FormGroup({
    //   moduleTopics: new FormControl([])
    // });
    this.mTForm = this.fb.group({
      moduleTopics: this.fb.array([])
    });
    if (this.moduleTopics) {
      this.setMTTable();
    }
  }

  private setMTTable(): void {
    const userCtrl = this.mTForm.get('moduleTopics') as FormArray;
    this.moduleTopics.forEach(moduleTopic => {
      userCtrl.push(this.setMTForm(moduleTopic));
    });
  }

  private setMTForm(moduleTopic: IModuleTopic): any {
    return this.fb.group({
      id: moduleTopic.id,
      activated: moduleTopic.activated,
      maxGrade: moduleTopic.maxGrade,
      minScore: moduleTopic.minScore,
      targetScore: moduleTopic.targetScore,
      startTime: moduleTopic.startTime ? moduleTopic.startTime.format(DATE_TIME_FORMAT) : null,
      endTime: moduleTopic.endTime ? moduleTopic.endTime.format(DATE_TIME_FORMAT) : null
    });
  }

  saveModuleTopic() {
    if (this.selectedIndex !== undefined) {
      const userCtrl = this.mTForm.get('moduleTopics') as FormArray;
      const moduleTopic: IModuleTopic = userCtrl.at(this.selectedIndex).value;
      if (moduleTopic.id) {
        const completedModuleTopic = this.getModuleTopic(moduleTopic.id);
        if (completedModuleTopic) {
          completedModuleTopic.maxGrade = moduleTopic.maxGrade;
          completedModuleTopic.targetScore = moduleTopic.targetScore;
          completedModuleTopic.minScore = moduleTopic.minScore;
          completedModuleTopic.startTime = moduleTopic.startTime ? moment(moduleTopic.startTime, DATE_TIME_FORMAT) : undefined;
          completedModuleTopic.endTime = moduleTopic.endTime ? moment(moduleTopic.endTime, DATE_TIME_FORMAT) : undefined;
          completedModuleTopic.activated = moduleTopic.activated;
          // completedModuleTopic.maxScoreCached = undefined;
          // completedModuleTopic.numAExercisesCached = undefined;
          // completedModuleTopic.numBExercisesCached = undefined;
          // completedModuleTopic.numCExercisesCached = undefined;
          // completedModuleTopic.numDExercisesCached = undefined;
          this.moduleTopicService.update(this.authorities, completedModuleTopic).subscribe(() => {
            this.toastService.show('', 'Registrado com sucesso', {status: 'success'});
          });
        }
      }
    }
  }

  getModuleTopic(mTId: number) {
    for (const mT of this.moduleTopics) {
      if (mT.id === mTId) {
        return mT;
      }
    }
    return null;
  }
}
