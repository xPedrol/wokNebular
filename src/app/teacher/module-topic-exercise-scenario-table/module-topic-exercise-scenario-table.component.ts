import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {IModuleTopicExerciseScenario} from '../../shared/models/module-topic-exercise-scenario.model';
import {ScenarioSkillsDialogComponent} from '../scenario-skills-dialog/scenario-skills-dialog.component';
import {NbDialogService} from '@nebular/theme';
import {IScenarioSkill} from '../../shared/models/scenario-skill.model';
import {ModuleTopicExerciseScenarioService} from '../../shared/services/module-topic-exercise-scenario.service';
import {IScenarioTestFile} from '../../shared/models/scenario-test-file.model';
import {ScenarioFilesDialogComponent} from '../scenario-files-dialog/scenario-files-dialog.component';

@Component({
  selector: 'app-module-topic-exercise-scenario-table',
  templateUrl: './module-topic-exercise-scenario-table.component.html',
  styleUrls: ['./module-topic-exercise-scenario-table.component.scss']
})
export class ModuleTopicExerciseScenarioTableComponent implements OnInit {
  mTForm: FormGroup;
  selectedIndex: number;
  loadingSkills = false;
  loadingFiles = false;
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
      title: 'Msg. Ajuda',
      class: 'text-left'
    },
    {
      title: '',
      class: 'text-left'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private scenarioService: ModuleTopicExerciseScenarioService
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

  getScenarioSkills(scenarioId: number): void {
    this.loadingSkills = true;
    this.scenarioService.getScenarioSkillsByScenarioId(scenarioId).subscribe((skills) => {
      this.openScenarioSkills(skills);
      this.loadingSkills = false;
    }, () => this.loadingSkills = false);
  }

  getScenarioFiles(scenarioId: number): void {
    this.loadingFiles = true;
    this.scenarioService.getScenarioFilesByScenarioId(scenarioId).subscribe((files) => {
      this.openScenarioFiles(files);
      this.loadingFiles = false;
    }, () => this.loadingFiles = false);
  }

  saveScenario(): void {
  }

  openScenarioSkills(skills: IScenarioSkill[]) {
    this.dialogService.open(ScenarioSkillsDialogComponent, {context: {skills}});
  }

  openScenarioFiles(files: IScenarioTestFile[]) {
    this.dialogService.open(ScenarioFilesDialogComponent, {context: {files}});
  }

}
