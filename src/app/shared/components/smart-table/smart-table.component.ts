import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';


@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {
  @Input() columns: any[];
  @Input() data: any[];
  @Input() editable = false;
  editableConfig;
  settings: any;

  source: LocalDataSource;

  constructor() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.settings = {
      hideSubHeader: true,
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: this.columns
    };
    console.warn(this.data);
    this.source = new LocalDataSource(this.data);
    // this.source.load(this.data);
  }
}
