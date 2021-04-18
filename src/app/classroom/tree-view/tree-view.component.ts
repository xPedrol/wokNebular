import {Component, Input, OnInit, Output} from '@angular/core';
import {IModuleTopic} from '../../shared/models/module-topic.model';
import {NbThemeService} from '@nebular/theme';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  selectedTopic: IModuleTopic;
  @Input() moduleTopics: IModuleTopic[][];
  @Output() justSelectModuleTopic = new EventEmitter();

  constructor(
    private themeService: NbThemeService
  ) {
  }

  ngOnInit(): void {
    this.themeService.onThemeChange().subscribe((theme) => {
      if (theme.name === 'dark' || theme.name === 'cosmic') {
        this.toggleTopicImgStyle(true);
      } else {
        this.toggleTopicImgStyle(false);
      }
    });
  }

  toggleTopicImgStyle(add = false) {
    for (let i = 0; i < window.document.getElementsByClassName('timeline-panel').length; i++) {
      if (add && !window.document.getElementsByClassName('timeline-panel').item(i).classList.contains('timeline-panel-border')) {
        window.document.getElementsByClassName('topic-img').item(i).classList.add('timeline-panel-border');
      } else if (!add && window.document.getElementsByClassName('topic-img').item(i).classList.contains('timeline-panel-border')) {
        window.document.getElementsByClassName('topic-img').item(i).classList.remove('timeline-panel-border');
      }
    }
  }

  selectTopic(topic) {
    this.selectedTopic = topic;
    this.justSelectModuleTopic.emit(topic);
  }

  unSelectTopic() {
    this.selectedTopic = null;
    this.justSelectModuleTopic.emit(null);
  }
}
