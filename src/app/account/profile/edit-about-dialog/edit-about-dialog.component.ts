import {Component, OnInit} from '@angular/core';
import {ICompleteUser} from '../../../shared/models/user/complete-user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProfile} from '../../../shared/models/user/profile.model';
import {AccountService} from '../../../shared/services/account.service';
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-edit-about-dialog',
  templateUrl: './edit-about-dialog.component.html',
  styleUrls: ['./edit-about-dialog.component.scss']
})
export class EditAboutDialogComponent implements OnInit {
  user: ICompleteUser;
  aboutForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.aboutForm = new FormGroup({
      aboutMe: new FormControl(this.user.profile.aboutMe, [Validators.maxLength(100)]),
      education: new FormControl(this.user.profile.education, [Validators.maxLength(100)]),
      experience: new FormControl(this.user.profile.experience, [Validators.maxLength(100)]),
    });
  }

  saveAbout() {
    const profile: IProfile = this.user.profile;
    profile.aboutMe = this.aboutForm.get('aboutMe').value;
    profile.education = this.aboutForm.get('education').value;
    profile.experience = this.aboutForm.get('experience').value;
    this.accountService.saveprofile(profile).subscribe(() => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
    });
  }
}
