import { Component, Input } from '@angular/core';
import { HelpersService } from '@app/shared/services/helpers.service';
import { DataSourceLogOutput } from '@app/data-source/models/data-source-crud.model';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('dataSource.dataSourceDetail.statistics.recentLogs.titles.crawledAt');
_('dataSource.dataSourceDetail.statistics.recentLogs.titles.status');
_('dataSource.dataSourceDetail.statistics.recentLogs.titles.message');
_('dataSource.dataSourceDetail.statistics.recentLogs.titles.message.profileId');
_('dataSource.dataSourceDetail.statistics.recentLogs.titles.avatarFullName');


enum ColumnsEnum {
  dropdown = 'dropdown',
  crawledAt = 'crawledAt',
  status = 'status',
  message = 'message',
  avatarFullName = 'avatarFullName',
}

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.scss'],
})
export class HistoryLogComponent {

  _dataSource: DataSourceLogOutput[];

  displayedColumns: string[] = Object.keys(ColumnsEnum);

  @Input()
  set dataSource(data) {
    this._dataSource = this.convertToFlat(data);
  }

  get dataSource() {
    return this._dataSource;
  }

  @Input()
  type: string;

  constructor(public helpers: HelpersService) { }

  convertToFlat(data: any[]) {
    let id = 0;
    const newData = [...data];
    newData.forEach(item => {
      item.parent = null;
      item.id = id++;
      item.level = 1;
      if (item.resourceLogs.length) {
        item.expanded = false;
        item.resourceLogs.forEach(itemChild1 => {
          itemChild1.parent = item.id;
          itemChild1.id = id++;
          itemChild1.level = 2;
          if (itemChild1.resourceLogs.length) {
            itemChild1.expanded = false;
            itemChild1.resourceLogs.forEach(itemChild2 => {
              itemChild2.parent = itemChild1.id;
              itemChild2.id = id++;
              itemChild2.level = 3;
            });
          }
        }
        );
      }
    });
    return newData;
  }



}
