import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LANGUAGES} from '../../../shared/constants/language.constants';
import {ICompleteUser} from '../../../shared/models/user/complete-user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  @Input() user: ICompleteUser;

  constructor() {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      city: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      mobileNumber: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      publicProfile: new FormControl(false),
      publicRank: new FormControl(false)
    });
    this.updateForm();
  }

  updateForm() {
    this.userForm.get('city').setValue(this.user.profile.city);
    this.userForm.get('uf').setValue(this.user.profile.uf);
    this.userForm.get('country').setValue(this.user.profile.country);
    this.userForm.get('mobileNumber').setValue(this.user.profile.mobileNumber);
    this.userForm.get('gender').setValue(this.user.profile.gender);
    this.userForm.get('birthday').setValue(this.user.profile.birthday);
    this.userForm.get('publicProfile').setValue(this.user.profile.publicProfile ? this.user.profile.publicProfile : false);
    this.userForm.get('publicRank').setValue(this.user.profile.publicRank ? this.user.profile.publicRank : false);
  }

  saveUser() {

  }

}
