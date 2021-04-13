import {Component, OnInit} from '@angular/core';
import {NbWindowService} from '@nebular/theme';
import {TopicListComponent} from '../topic-list/topic-list.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-classroom-dashboard',
  templateUrl: './classroom-initial.component.html',
  styleUrls: ['./classroom-initial.component.scss']
})
export class ClassroomInitialComponent implements OnInit {
  selectedStatus = 0;
  status = ['basic', 'primary', 'info', 'success', 'warning', 'danger', 'control'];
  fruits = [
    'mamao',
    'maca'
  ];
  rows = [
    {name: 'Austin', gender: 'Male', company: 'Swimlane'},
    {name: 'Dany', gender: 'Male', company: 'KFC'},
    {name: 'Molly', gender: 'Female', company: 'Burger King'}
  ];
  columns = [{prop: 'name'}, {name: 'Gender'}, {name: 'Company'}];

  constructor(
    private windowService: NbWindowService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.warn(this.activatedRoute.snapshot.data);
    this.selectedStatus = Math.floor(Math.random() * 8);
  }

  openTopicsWindow(moduleId: number) {
    const authorities = this.activatedRoute.snapshot.data.authorities;
    this.windowService.open(TopicListComponent, {title: `Lista de tópicos`, context: {authorities, moduleId: 'moduleId'}});
  }

}
