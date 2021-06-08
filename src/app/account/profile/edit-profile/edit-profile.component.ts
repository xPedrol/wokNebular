import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IAccount} from '../../../shared/models/user/account.model';
import {AccountService} from '../../../shared/services/account.service';
import {NbToastrService} from '@nebular/theme';
import {ICompleteUser} from '../../../shared/models/user/complete-user.model';
import {LANGUAGES} from '../../../shared/constants/language.constants';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  photo: File | null;
  languages = LANGUAGES;
  @Input() user: ICompleteUser;

  constructor(
    private accountService: AccountService,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      langKey: new FormControl(null, [Validators.required])
    });
    this.updateForm();
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.accountService.save(this.getProfile()).subscribe(() => {
        this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      });
    }
  }

  updateForm() {
    this.profileForm.get('firstName').setValue(this.user.firstName);
    this.profileForm.get('lastName').setValue(this.user.lastName);
    this.profileForm.get('email').setValue(this.user.email);
    this.profileForm.get('langKey').setValue(this.user.langKey);
  }

  savePhoto(event: any) {
    event.preventDefault();
    if (this.photo) {
      this.accountService.imageUpload(this.photo).subscribe(() => {
        console.warn('salvoo');
      });
    }
  }

  getProfile(): IAccount {
    const account: IAccount = Object();
    account.login = this.user.login;
    account.firstName = this.profileForm.get('firstName').value;
    account.lastName = this.profileForm.get('lastName').value;
    account.email = this.profileForm.get('email').value;
    account.langKey = this.profileForm.get('langKey').value;
    return account;
  }

  changePhoto(target) {
    this.photo = target.files.item(0);
    console.warn(this.photo);
  }
}
