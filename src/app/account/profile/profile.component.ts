import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from '../../shared/services/user.service';
import {ICompleteUser} from '../../shared/models/user/complete-user.model';
import {takeUntil} from 'rxjs/operators';
import {IUserProfileStatistics} from '../../shared/models/user/user-profile-statistics.model';
import {IUserSkill} from '../../shared/models/user/user-skill.model';
import {NbDialogService} from '@nebular/theme';
import {EditAboutDialogComponent} from './edit-about-dialog/edit-about-dialog.component';
import {SharedFunctions} from '../../shared/shared.functions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  user: ICompleteUser;
  userStatistics: IUserProfileStatistics;
  loadingUser = true;
  loadingUserStatistics = true;
  userSkills: IUserSkill[];
  loadingUserSkills = true;
  userLogin: string;

  constructor(
    private userService: UserService,
    private dialogService: NbDialogService,
    private sF: SharedFunctions,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.userLogin = this.activatedRoute.snapshot.params.userSlug;
    if (!this.userLogin) {
      this.getCompleteUser();
      this.getUserProfileStatistics();
      this.getUserSkills();
    } else {
      this.getCompleteUserF();
      this.getUserProfileStatisticsF();
      this.getUserSkillsF();
    }
    this.sF.setPageData('Perfil');
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  getCompleteUserF(): void {
    this.loadingUser = true;
    this.userService.getProfileByLogin(this.userLogin).subscribe(user => {
      this.loadingUser = false;
      this.user = user;
    }, () => this.loadingUser = false);
  }

  getUserProfileStatisticsF(): void {
    this.loadingUserStatistics = true;
    this.userService.getUserProfileStatisticsByLogin(this.userLogin).subscribe((statistics) => {
      this.loadingUserStatistics = false;
      this.userStatistics = statistics;
    }, () => this.loadingUserStatistics = false);
  }

  getUserSkillsF(): void {
    this.loadingUserStatistics = true;
    this.userService.getUserSkillsByLogin(this.userLogin).subscribe((skills) => {
      this.userSkills = this.betterSkillsFisrt(skills);
      this.userSkills.splice(5, this.userSkills.length);
      this.loadingUserSkills = false;
    }, () => this.loadingUserSkills = false);
  }

  getCompleteUser(): void {
    this.loadingUser = true;
    this.userService.getCompleteUser().pipe(takeUntil(this.subject$)).subscribe(user => {
      this.loadingUser = false;
      this.user = user;
    }, () => this.loadingUser = false);
  }

  getUserProfileStatistics(): void {
    this.loadingUserStatistics = true;
    this.userService.getUserProfileStatistics().subscribe((statistics) => {
      this.loadingUserStatistics = false;
      this.userStatistics = statistics;
    }, () => this.loadingUserStatistics = false);
  }

  getUserSkills(): void {
    this.loadingUserSkills = true;
    this.userService.getUserSkillsArray().subscribe((skills) => {
      this.userSkills = this.betterSkillsFisrt(skills);
      this.userSkills.splice(5, this.userSkills.length);
      this.loadingUserSkills = false;
    }, () => this.loadingUserSkills = false);
  }

  betterSkillsFisrt(skills: IUserSkill[]): IUserSkill[] {
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length - 1; j++) {
        if (skills[i] && skills[i]?.point >= 0) {
          if (
            (skills[i]?.point || 0) <
            (skills[j]?.point || 0)
          ) {
            const aux = skills[i]?.point;
            skills[i].point = skills[j]?.point;
            skills[j].point = aux;
          }
        }
      }
    }
    return skills;
  }

  openEditAboutDialog() {
    this.dialogService.open(EditAboutDialogComponent, {context: {user: this.user}});
  }
}
