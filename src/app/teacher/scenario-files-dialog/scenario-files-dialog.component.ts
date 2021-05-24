import {Component, OnInit} from '@angular/core';
import {IScenarioTest} from '../../shared/models/scenario-test.model';

@Component({
  selector: 'app-scenario-files-dialog',
  templateUrl: './scenario-files-dialog.component.html',
  styleUrls: ['./scenario-files-dialog.component.scss']
})
export class ScenarioFilesDialogComponent implements OnInit {
  files: IScenarioTest[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
