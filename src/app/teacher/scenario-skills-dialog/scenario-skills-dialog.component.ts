import {Component, OnInit} from '@angular/core';
import {IScenarioSkill} from '../../shared/models/scenario-skill.model';

@Component({
  selector: 'app-scenario-skills-dialog',
  templateUrl: './scenario-skills-dialog.component.html',
  styleUrls: ['./scenario-skills-dialog.component.scss']
})
export class ScenarioSkillsDialogComponent implements OnInit {
  skills: IScenarioSkill[];
  tableColumn = [
    {
      title: 'Habilidade',
      class: 'text-left'
    },
    {
      title: 'Pontos',
      class: 'text-center'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
