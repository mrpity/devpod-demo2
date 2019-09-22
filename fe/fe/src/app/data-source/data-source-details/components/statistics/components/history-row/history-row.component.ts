import { Component, Input, OnInit } from '@angular/core';
import { HelpersService } from '@app/shared/services/helpers.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataSourceLogOutput, MessageKey } from '@app/data-source/models/data-source-crud.model';

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
  selector: 'app-history-row',
  templateUrl: './history-row.component.html',
  styleUrls: ['./history-row.component.scss']
})
export class HistoryRowComponent implements OnInit {

  @Input()
  source: DataSourceLogOutput;

  displayedColumns: string[] = Object.keys(ColumnsEnum);

  constructor(public helpers: HelpersService) { }

  ngOnInit() {
  }

  get Columns() {
    return ColumnsEnum;
  }

  get messageKey() {
    return MessageKey;
  }

  check(source) {
    if (!source.hasOwnProperty('expanded')) {
      return;
    }

    if (!source.expanded && source.level === 1) {
      this.closeAll(source);
    }
  }

  closeAll(itemObject: DataSourceLogOutput) {
    const newData = { ...itemObject };
    if (newData.resourceLogs) {
      newData.resourceLogs.forEach(item => {
        if (item.hasOwnProperty('expanded')) {
          item.expanded = false;
          item.resourceLogs.forEach(itemChild1 => {
            if (itemChild1.hasOwnProperty('expanded')) {
              itemChild1.expanded = false;
            }
          }
          );
        }
      });
    }

    return newData;
  }

}
