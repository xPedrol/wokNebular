import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subject$ = new Subject();

  constructor() {
  }

  ngOnInit(): void {

  }

}
