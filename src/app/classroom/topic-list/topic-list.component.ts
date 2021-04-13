import {Component, Input, OnInit} from '@angular/core';
import {NbWindowConfig, NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  users: { name: string, title: string }[] = [
    {name: 'Carla Espinosa', title: 'Nurse'},
    {name: 'Bob Kelso', title: 'Doctor of Medicine'},
    {name: 'Janitor', title: 'Janitor'},
    {name: 'Perry Cox', title: 'Doctor of Medicine'},
    {name: 'Ben Sullivan', title: 'Carpenter and photographer'},
  ];
  authorities?: string;
  moduleId?: number;

  constructor(
    private windowConfig: NbWindowConfig,
    public windowRef: NbWindowRef
  ) {
  }

  ngOnInit(): void {
    this.authorities = (this.windowConfig.context as any)?.authorities;
    this.moduleId = (this.windowConfig.context as any)?.moduleId;
    console.warn(this.authorities, this.moduleId);
  }

}
