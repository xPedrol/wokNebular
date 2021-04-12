import {Component} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nebularWok';
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      expanded: true,
      children: [
        {
          title: 'Change Password',
          children: [
            {
              title: 'Teste',
              children: [
                {
                  title: 'Teste2',
                }
              ]
            }
          ]
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
      ],
    },
    {
      title: 'Shopping Bag',
    },
    {
      title: 'Orders',
    },
  ];
}
