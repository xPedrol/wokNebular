import {Component, Input, OnInit} from '@angular/core';
import {ISubmission} from '../../shared/models/submission.model';

@Component({
  selector: 'app-submission-table',
  templateUrl: './submission-table.component.html',
  styleUrls: ['./submission-table.component.scss']
})
export class SubmissionTableComponent implements OnInit {
  @Input() submissions: ISubmission[];
  tableColumn = [
    {
      title: 'Data',
      class: 'text-left'
    },
    {
      title: 'Time',
      class: 'text-left'
    },
    {
      title: 'Arquivos',
      class: 'text-left'
    },
    {
      title: 'Linguagem',
      class: 'text-center'
    },
    {
      title: 'Resultado',
      class: 'text-left'
    },
    {
      title: 'Notas',
      class: 'text-left'
    },
    {
      title: '',
      class: 'text-left'
    }
  ];
  constructor() {
  }

  ngOnInit(): void {
  }

}
