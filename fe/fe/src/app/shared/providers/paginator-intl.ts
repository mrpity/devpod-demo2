import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('paginator.itemsPerPage');
_('paginator.nextPage');
_('paginator.prevPage');
_('paginator.ofLabel');
_('paginator.firstPage');
_('paginator.lastPage');

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  OF_LABEL = 'of';

  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translate.get([
      'paginator.itemsPerPage',
      'paginator.nextPage',
      'paginator.prevPage',
      'paginator.ofLabel',
      'paginator.firstPage',
      'paginator.lastPage'
    ]).pipe(takeUntil(this.unsubscribe))
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['paginator.itemsPerPage'];
        this.firstPageLabel = translation['paginator.firstPage'];
        this.lastPageLabel = translation['paginator.lastPage'];
        this.nextPageLabel = translation['paginator.nextPage'];
        this.previousPageLabel = translation['paginator.prevPage'];
        this.OF_LABEL = translation['paginator.ofLabel'];
        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.OF_LABEL} ${length}`;
  }
}
