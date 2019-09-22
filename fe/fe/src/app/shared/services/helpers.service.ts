import { Injectable } from '@angular/core';

import * as moment from 'moment';
import 'moment-timezone';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { MessageKey } from '@app/data-source/models/data-source-crud.model';
import { ReactionOutput } from '@app/search/models/result.model';


_('settings.proxy.add.protocol.http');
_('settings.proxy.add.protocol.ssl');
_('settings.proxy.add.protocol.ftp');
_('settings.proxy.add.protocol.socks4');
_('settings.proxy.add.protocol.socks5');
_('dataSource.addDataSource.createAutomationRule.frequency.daily');
_('dataSource.addDataSource.createAutomationRule.frequency.monthly');
_('dataSource.addDataSource.createAutomationRule.frequency.weekly');
_('dataSource.addDataSource.createAutomationRule.frequency.once');
_('dataSource.addDataSource.types.fb_profile');
_('dataSource.addDataSource.types.fb_timeline');
_('dataSource.addDataSource.types.fb_post');
_('dataSource.addDataSource.types.fb_group');
_('dataSource.addDataSource.types.ok_profile');
_('dataSource.addDataSource.types.ok_timeline');
_('dataSource.addDataSource.types.ok_post');
_('dataSource.addDataSource.types.web_general');
_('dataSource.list.status.crawled');
_('dataSource.list.status.deduplicated');
_('dataSource.list.status.new');
_('dataSource.list.status.succeeded');
_('dataSource.list.status.crawling_failed');
_('dataSource.list.status.crawling');
_('dataSource.list.selectedItems.middle');
_('dataSource.list.selectedItems.single');
_('dataSource.list.selectedItems.plural');
_('dataSource.list.deleteResult.success.middle');
_('dataSource.list.deleteResult.success.single');
_('dataSource.list.deleteResult.success.plural');
_('dataSource.list.deleteResult.fail.middle');
_('dataSource.list.deleteResult.fail.single');
_('dataSource.list.deleteResult.fail.plural');
_('dataSource.importDataSource.fileLength.middle');
_('dataSource.importDataSource.fileLength.single');
_('dataSource.importDataSource.fileLength.plural');
_('settings.proxy.delete.deleteResult.success.middle');
_('settings.proxy.delete.deleteResult.success.single');
_('settings.proxy.delete.deleteResult.success.plural');
_('settings.proxy.delete.deleteResult.fail.middle');
_('settings.proxy.delete.deleteResult.fail.single');
_('settings.proxy.delete.deleteResult.fail.plural');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.crawling');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.crawled');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.no_proxy');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.bad_proxy');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.timeout');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.invalid_credentials');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.account_blocked');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.unspecified');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.deduplicated');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.crawling_failed');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.pipeline_failed');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.new');
_('dataSource.dataSourceDetail.statistics.recentLogs.messageKey.succeeded');



@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private translate: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  addDay(date) {
    const newDate = moment(date).add(1, 'day').toDate();
    return newDate;
  }

  removeEmptyKeys(obj) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      } else if (Array.isArray(obj[propName]) && obj[propName].length === 0) {
        delete obj[propName];
      }
    }
    return obj;
  }

  /* For objects with nested objects */
  cleanEmptyKeys(obj) {
    const newObj = JSON.parse(JSON.stringify(obj));
    const removeKeys = (object) => {
      // tslint:disable-next-line
      for (const propName in object) {
        if (typeof object[propName] === 'object') {
          removeKeys(object[propName]);
        }
        if (object[propName] === null
          || object[propName] === undefined
          || object[propName] === ''
          || ((typeof object[propName] === 'object' && !Array.isArray(object[propName])) && Object.keys(object[propName]).length === 0)) {
          delete object[propName];
        }
      }
      return object;
    };
    return removeKeys(newObj);
  }

  getDeleteDataSourceMessage(idList, type, error?) {
    let result;
    let key;
    const idListStr = String(idList.length);
    switch (type) {
      case 'success':
        if (idListStr.endsWith('2') || idListStr.endsWith('3') || idListStr.endsWith('4')) {
          key = 'dataSource.list.deleteResult.success.middle';
        } else if (idListStr.endsWith('1')) {
          key = 'dataSource.list.deleteResult.success.single';
        } else {
          key = 'dataSource.list.deleteResult.success.plural';
        }
        break;
      case 'fail':
        if (idListStr.endsWith('2') || idListStr.endsWith('3') || idListStr.endsWith('4')) {
          key = 'dataSource.list.deleteResult.fail.middle';
        } else if (idListStr.endsWith('1')) {
          key = 'dataSource.list.deleteResult.fail.single';
        } else {
          key = 'dataSource.list.deleteResult.fail.plural';
        }
        break;
    }
    result = this.translate.instant(key, { value: idList.length });
    return result;
  }

  getFileLinesMessage(length) {
    let result;
    let key;
    const lengthStr = String(length);
    const plural = () => {
      const endsNumLast = parseInt(lengthStr.substr(-1), 10);
      const endsNumPrev = parseInt(lengthStr.substr(-2), 10);
      return (5 <= endsNumLast && endsNumLast <= 9) || (10 <= endsNumPrev && endsNumPrev <= 20);
    };
    if (plural()) {
      key = 'dataSource.importDataSource.fileLength.plural';
    } else if (lengthStr.endsWith('1')) {
      key = 'dataSource.importDataSource.fileLength.single';
    } else if (lengthStr.endsWith('2') || lengthStr.endsWith('3') || lengthStr.endsWith('4')) {
      key = 'dataSource.importDataSource.fileLength.middle';
    } else {
      key = 'dataSource.importDataSource.fileLength.plural';
    }
    result = this.translate.instant(key);
    return result;
  }



  getDeleteProxyMessage(idList, type, error?) {
    let result;
    let key;
    const idListStr = String(idList.length);
    switch (type) {
      case 'success':
        if (idListStr.endsWith('2') || idListStr.endsWith('3') || idListStr.endsWith('4')) {
          key = 'settings.proxy.delete.deleteResult.success.middle';
        } else if (idListStr.endsWith('1')) {
          key = 'settings.proxy.delete.deleteResult.success.single';
        } else {
          key = 'settings.proxy.delete.deleteResult.success.plural';
        }
        break;
      case 'fail':
        if (idListStr.endsWith('2') || idListStr.endsWith('3') || idListStr.endsWith('4')) {
          key = 'settings.proxy.delete.deleteResult.fail.middle';
        } else if (idListStr.endsWith('1')) {
          key = 'settings.proxy.delete.deleteResult.fail.single';
        } else {
          key = 'settings.proxy.delete.deleteResult.fail.plural';
        }
        break;
    }
    result = this.translate.instant(key, { value: idList.length });
    return result;
  }


  getTimeFrameValues() {
    const step = 2 * 60 * 60 * 1000;
    const endTime = 24 * 60 * 60 * 1000;
    const timeframes = [];
    for (let time = 0; time <= endTime; time += step) {
      timeframes.push(time);
    }
    return timeframes;
  }

  getTimeZones() {
    const timeZones = moment.tz.names();
    const offsetTmz = [];

    timeZones.forEach((value, i) => {
      offsetTmz.push(`${moment.tz(timeZones[i]).format('Z')}`);
    });

    const offsetTmzUnique = offsetTmz.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });

    return offsetTmzUnique.sort();
  }

  getCurrentOffsetValue(): string {
    const timezone = moment.tz.guess();
    return moment.tz(timezone).format('Z');
  }

  getCurrentUtcDate(): string {
    return moment().toISOString();
  }

  generateListNumber(lowEnd, highEnd) {
    const list = [];
    for (let i = lowEnd; i <= highEnd; i++) {
      list.push(i);
    }
    return list;
    // return Array(highEnd - lowEnd + 1).fill(null).map((e, i) => lowEnd + i); // Right way
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isObjectEqual(obj1, obj2) {
    if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj1 === typeof obj2) {
      return Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every(key => this.isObjectEqual(obj1[key], obj2[key]));
    } else {
      return obj1 === obj2;
    }
  }

  getFrequency(frequency) {
    return `dataSource.addDataSource.createAutomationRule.frequency.${frequency.toLowerCase()}`;
  }

  getType(type) {
    return `dataSource.addDataSource.types.${type.toLowerCase()}`;
  }

  getItemCountMessage(selectedItemsCount: number) {
    const _selectedItemsCount = selectedItemsCount;
    const countStr = String(_selectedItemsCount);
    let message;
    if ((countStr.endsWith('2') || countStr.endsWith('3') || countStr.endsWith('4')) && countStr.length < 2) {
      message = this.translate.instant('dataSource.list.selectedItems.middle', { value: selectedItemsCount });
    } else if (countStr.endsWith('1') && countStr.length === 1) {
      message = this.translate.instant('dataSource.list.selectedItems.single', { value: selectedItemsCount });
    } else {
      message = this.translate.instant('dataSource.list.selectedItems.plural', { value: selectedItemsCount });
    }
    return message;
  }

  showSuccessSnackBar(message) {
    const config: MatSnackBarConfig<any> = {
      data: { message },
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar-success'
    };
    this.snackBar.openFromComponent(SnackBarComponent, config);
  }

  showErrorSnackBar(message, config = {}) {
    const defaultConfig: MatSnackBarConfig<any> = {
      data: { message },
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar-error',
      ...config
    };
    this.snackBar.openFromComponent(SnackBarComponent, defaultConfig);
  }

  openSnackBar(data, component = null, options = {}) {
    this.snackBar.openFromComponent(component || SnackBarComponent, {
      data,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: data.type || '',
      ...options
    });
  }

  openConfirmDialog(data) {
    const defaultDialogConfig: MatDialogConfig<any> = {
      panelClass: 'mat-custom-dialog',
      id: 'd_confirmDialog',
      position: { top: '100px' },
      data: data,
    };
    return this.dialog.open(ConfirmationPopupComponent, defaultDialogConfig);
  }

  isElementInViewport(element: Element) {
    if (element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    return false;
  }

  getDataSourceStatusMessage(status: string) {
    if (!status) {
      return;
    }
    return `dataSource.list.status.${status.toLowerCase()}`;
  }

  getStatisticsMessageKey(messageKey: MessageKey) {
    if (!messageKey) {
      return;
    }
    return `dataSource.dataSourceDetail.statistics.recentLogs.messageKey.${messageKey.toLowerCase()}`;
  }

  isUrl(url: string): boolean {
    return (/^https?:\/\/.+$/i).test(url);
  }

  formatDateOnly(date) {
    return date ? moment(date).format().split('T')[0] : null;
  }

  likesCount(reactions: ReactionOutput[]): number {
    if (reactions && reactions.length) {
      return reactions.reduce((accumulator, reaction) => {
        return accumulator + reaction.count;
      }, 0);
    }
    return 0;
  }

}

