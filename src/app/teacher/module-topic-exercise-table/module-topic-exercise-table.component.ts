import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {IModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {difficultyLevel} from '../../shared/constants/difficulty-level';
import {ModuleTopicExerciseService} from '../../shared/services/module-topic-exercise.service';
import {NbToastrService} from '@nebular/theme';
import {DifficultyLevelBasic} from '../../shared/models/basic/difficultyLevel-basic.model';

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
    private fb: FormBuilder,
    private moduleTopicExerciseService: ModuleTopicExerciseService,
    private toastService: NbToastrService
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
    if (this.selectedIndex >= 0) {
      const userCtrl = this.mTEForm.get('mTEs') as FormArray;
      const mtE: IModuleTopicExercise = userCtrl.at(this.selectedIndex).value;
      const completeMTE = this.mTExercises[this.selectedIndex];
      completeMTE.alias = mtE.alias;
      completeMTE.activated = mtE.activated ? true : false;
      completeMTE.allowJudge = mtE.allowJudge ? true : false;
      completeMTE.allowSubmit = mtE.allowSubmit ? true : false;
      // @ts-ignore
      completeMTE.difficultyLevel = {...new DifficultyLevelBasic(), id: mtE.difficultyLevel};
      // completeMTE.moduleTopic = undefined;
      this.moduleTopicExerciseService.updateModuleTopicExercise(completeMTE).subscribe(() => {
        this.toastService.show('', 'Registrado com sucesso', {status: 'success'});
      });
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
