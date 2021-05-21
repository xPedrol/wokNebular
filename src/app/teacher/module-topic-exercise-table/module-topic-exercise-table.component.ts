import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {IModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {difficultyLevel} from '../../shared/constants/difficulty-level';
import {IModuleTopic} from '../../shared/models/module-topic.model';

@Component({
  selector: 'app-module-topic-exercise-table',
  templateUrl: './module-topic-exercise-table.component.html',
  styleUrls: ['./module-topic-exercise-table.component.scss']
})
export class ModuleTopicExerciseTableComponent implements OnInit {
  mTEForm: FormGroup;
  selectedIndex: number;
  difficultiesLevel = difficultyLevel;
  @Input() mTExercises: IModuleTopicExercise[];
  tableColumn = [
    {
      title: 'Ativo',
      class: 'text-left'
    },
    {
      title: 'Submissões',
      class: 'text-left'
    },
    {
      title: 'Julgamento',
      class: 'text-left'
    },
    {
      title: 'Apelido',
      class: 'text-left'
    },
    {
      title: 'N. Exercício',
      class: 'text-left'
    },
    {
      title: 'Dificuldade',
      class: 'text-left'
    },
    {
      title: '',
      class: 'text-left'
    }
  ];

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.mTEForm = this.fb.group({
      mTEs: this.fb.array([])
    });
    if (this.mTExercises) {
      this.setMTTable();
    }
  }

  saveModuleTopicExercise() {
    if (this.selectedIndex) {
      const userCtrl = this.mTEForm.get('mTEs') as FormArray;
      const mtE: IModuleTopicExercise = userCtrl.at(this.selectedIndex).value;
    }
  }

  private setMTTable(): void {
    const userCtrl = this.mTEForm.get('mTEs') as FormArray;
    this.mTExercises.forEach(mTes => {
      userCtrl.push(this.setMTForm(mTes));
    });
  }

  private setMTForm(mTE: IModuleTopicExercise): any {
    return this.fb.group({
      id: mTE.id,
      activated: mTE.activated,
      alias: mTE.alias,
      allowSubmit: mTE.allowSubmit ? true : false,
      allowJudge: mTE.allowJudge ? true : false,
      difficultyLevel: mTE.difficultyLevel.id
    });
  }
}
