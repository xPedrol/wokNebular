import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {IModuleTopicExerciseScenario} from '../../shared/models/module-topic-exercise-scenario.model';

@Component({
  selector: 'app-module-topic-exercise-scenario-table',
  templateUrl: './module-topic-exercise-scenario-table.component.html',
  styleUrls: ['./module-topic-exercise-scenario-table.component.scss']
})
export class ModuleTopicExerciseScenarioTableComponent implements OnInit {
  mTForm: FormGroup;
  @Input() scenarios: IModuleTopicExerciseScenario[];
  tableColumn = [
    {
      title: 'Ativo',
      class: 'text-left'
    },
    {
      title: 'Nome',
      class: 'text-center'
    },
    {
      title: 'Dificuldade',
      class: 'text-center'
    },
    {
      title: 'Descrição',
      class: 'text-left'
    },
    // {
    //   title: '',
    //   class: 'text-left'
    // }
  ];

  constructor(
    private fb: FormBuilder,
    // private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.mTForm = this.fb.group({
      scenarios: this.fb.array([])
    });
    if (this.scenarios) {
      this.setMTTable();
    }
  }

  private setMTTable(): void {
    const userCtrl = this.mTForm.get('scenarios') as FormArray;
    this.scenarios.forEach(scenario => {
      userCtrl.push(this.setScenarioForm(scenario));
    });
  }

  private setScenarioForm(scenario: IModuleTopicExerciseScenario): any {
    return this.fb.group({
      id: scenario.id,
      activated: scenario.activated,
    });
  }

  saveScenario(): void {
  }

  // openScenarioSkill() {
  //   this.dialogService.open(ScenarioSkillsDialogComponent);
  // }

}
