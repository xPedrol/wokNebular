import {Component, Input, OnInit} from '@angular/core';
import {IReportResults} from '../../../shared/models/module-topic-user-result.model';

@Component({
  selector: 'app-users-results-table',
  templateUrl: './users-results-table.component.html',
  styleUrls: ['./users-results-table.component.scss']
})
export class UsersResultsTableComponent implements OnInit {
  @Input() results: IReportResults[];
  columns = [
    {
      title: 'Tópico',
      class: 'text-left'
    },
    {
      title: 'Pontuação',
      class: 'text-left'
    },
    {
      title: 'Exercícios',
      class: 'text-center'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
