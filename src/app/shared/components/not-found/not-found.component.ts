import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  url?: string;

  constructor(
    private route: Router,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService.getAccount(true).subscribe(() => {
      this.url = this.route.url.replace('/', '');
    }, () => this.url = this.route.url.replace('/', ''));
  }

}
