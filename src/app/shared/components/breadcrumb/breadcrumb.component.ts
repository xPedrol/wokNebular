import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() routePrefix: string;
  @Input() courseSlug: string;
  @Input() disciplineSlug?: string;
  @Input() topicSlug?: string;
  @Input() exerciseSlug?: string;
  @Input() last: number;
  constructor() {
  }

  ngOnInit(): void {
  }

}
