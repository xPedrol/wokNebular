import {Component, Input, OnInit, Output} from '@angular/core';
import {IModuleTopic} from '../../shared/models/module-topic.model';
import {EventEmitter} from '@angular/core';
import {SharedFunctions} from '../../shared/shared.functions';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../shared/constants/authority.constants';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  selectedTopic: IModuleTopic;
  @Input() moduleTopics: IModuleTopic[][];
  @Output() justSelectModuleTopic = new EventEmitter();
  url: string;
  isTeacher = false;

  constructor(
    public sF: SharedFunctions,
    private ac: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const courseSlug = this.ac.snapshot.params.courseSlug;
    const disciplineSlug = this.ac.snapshot.params.disciplineSlug;
    if (this.ac.snapshot.data.authorities.includes(Authority.TEACHER)) {
      this.isTeacher = true;
    }
    this.url = `/${this.sF.routeAuthSwitch(this.ac.snapshot.data.authorities, true)}classroom/course/${courseSlug}/module/${disciplineSlug}/topic`;
    // this.themeService.onThemeChange().subscribe((theme) => {
    //   if (theme.name === 'dark' || theme.name === 'cosmic') {
    //     this.toggleTopicImgStyle(true);
    //   } else {
    //     this.toggleTopicImgStyle(false);
    //   }
    // });
  }

  // toggleTopicImgStyle(add = false) {
  //   for (let i = 0; i < window.document.getElementsByClassName('timeline-panel').length; i++) {
  //     if (add && !window.document.getElementsByClassName('timeline-panel').item(i).classList.contains('timeline-panel-border')) {
  //       window.document.getElementsByClassName('topic-img').item(i).classList.add('timeline-panel-border');
  //     } else if (!add && window.document.getElementsByClassName('topic-img').item(i).classList.contains('timeline-panel-border')) {
  //       window.document.getElementsByClassName('topic-img').item(i).classList.remove('timeline-panel-border');
  //     }
  //   }
  // }

  selectTopic(topic) {
    this.selectedTopic = topic;
    this.justSelectModuleTopic.emit(topic);
  }

  unSelectTopic() {
    this.selectedTopic = null;
    this.justSelectModuleTopic.emit(null);
  }
}
