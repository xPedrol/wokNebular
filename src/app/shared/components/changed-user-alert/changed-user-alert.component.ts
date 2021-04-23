import {Component, OnInit} from '@angular/core';
import {SharedFunctions} from '../../shared.functions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-changed-user-alert',
  templateUrl: './changed-user-alert.component.html',
  styleUrls: ['./changed-user-alert.component.scss']
})
export class ChangedUserAlertComponent implements OnInit {

  constructor(
    public sF: SharedFunctions,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

}
