import {Component, OnInit} from '@angular/core';
import {ICompleteUser} from '../../../shared/models/user/complete-user.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-about-dialog',
  templateUrl: './edit-about-dialog.component.html',
  styleUrls: ['./edit-about-dialog.component.scss']
})
export class EditAboutDialogComponent implements OnInit {
  user: ICompleteUser;
  aboutForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.aboutForm = new FormGroup({
      aboutMe: new FormControl(this.user.profile.aboutMe),
      education: new FormControl(this.user.profile.education),
      experience: new FormControl(this.user.profile.experience),
    });
  }

  saveAbout() {
  }
}
