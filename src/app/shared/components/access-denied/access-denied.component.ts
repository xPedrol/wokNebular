import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  view = false;

  constructor(
    private route: Router,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.getAccount(true).subscribe(() => {
      this.view = true;
    }, () => this.view = true);
  }


}
