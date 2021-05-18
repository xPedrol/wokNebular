import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICompleteUser} from '../../../shared/models/user/complete-user.model';
import {IProfile} from '../../../shared/models/user/profile.model';
import {AccountService} from '../../../shared/services/account.service';
import {NbToastrService} from '@nebular/theme';
import {genders} from '../../../shared/constants/gender.constants';
import {ufs} from '../../../shared/constants/ufs.constants';
import {GeneralService} from '../../../shared/services/general.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  genders = genders;
  ufs = ufs;
  cities: string[];
  @Input() user: ICompleteUser;

  constructor(
    private accountService: AccountService,
    private toastService: NbToastrService,
    private generalService: GeneralService
  ) {
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
    this.userForm.get('birthday').setValue(this.user.profile.birthday.format('yyyy-MM-DD'));
    this.userForm.get('publicProfile').setValue(this.user.profile.publicProfile ? this.user.profile.publicProfile : false);
    this.userForm.get('publicRank').setValue(this.user.profile.publicRank ? this.user.profile.publicRank : false);
    this.getCitiesByUF(true);
  }

  saveUser() {
    if (this.userForm.valid) {
      this.accountService.saveprofile(this.getUser()).subscribe(() => {
        this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      });
    }
  }

  getUser(): IProfile {
    const profile: IProfile = Object();
    profile.id = this.user.profile.id;
    profile.city = this.userForm.get('city').value;
    profile.uf = this.userForm.get('uf').value;
    profile.country = this.userForm.get('country').value;
    profile.mobileNumber = this.userForm.get('mobileNumber').value;
    profile.gender = this.userForm.get('gender').value;
    profile.birthday = this.userForm.get('birthday').value;
    profile.publicProfile = this.userForm.get('publicProfile').value;
    profile.publicRank = this.userForm.get('publicRank').value;
    return profile;
  }

  getCitiesByUF(maintainCity = false) {
    if (this.userForm.get('uf').value) {
      this.generalService.getCitiesByUF(this.userForm.get('uf').value).subscribe(cities => {
        this.cities = cities;
        if (!maintainCity) {
          this.userForm.get('city').setValue('');
        }
      });
    }
  }

}
