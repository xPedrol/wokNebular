import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'app-classroom-content',
  templateUrl: './classroom-content.component.html',
  styleUrls: ['./classroom-content.component.scss']
})
export class ClassroomContentComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
