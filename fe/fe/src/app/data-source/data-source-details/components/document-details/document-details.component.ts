import { Component, OnInit} from '@angular/core';
import { ContentTypeEnum } from '@app/search/models/result.model';
import { select, Store } from '@ngrx/store';
import { DataSourceStoreSelectors, DataSourceStoreState} from '@app/data-source/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentDataType } from '@app/data-source/models/data-source-crud.model';
import { PostsSelectors } from '@app/search/store/selectors';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  documentType$ = this.store$.pipe(
    select(DataSourceStoreSelectors.getDocumentType)
  );

  resultDetails$: Observable<DocumentDataType> = this.store$.pipe(
    select(DataSourceStoreSelectors.getDocumentData)
  );

  isPostGeneralLoading$: Observable<Boolean> = this.store$.pipe(
    select(PostsSelectors.getIsPostGeneralLoading),
  );

  isOriginsLoadingFailure$: Observable<Boolean> = this.store$.pipe(
    select(PostsSelectors.getIsOriginsLoadingFailure),
  );

  isDocumentCrawled$: Observable<Boolean> = this.store$.pipe(
    select(DataSourceStoreSelectors.getIsDocumentCrawled)
  );

  isDocumentLoading$: Observable<Boolean> = this.store$.pipe(
    select(DataSourceStoreSelectors.getIsDocumentLoading)
  );

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store$: Store<DataSourceStoreState.State>) { }

  ngOnInit()  {
  }

  get contentType() {
    return ContentTypeEnum;
  }

}
