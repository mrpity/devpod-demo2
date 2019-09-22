import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators';
import { HelpersService } from '@app/shared/services/helpers.service';
import { GetRequestOutput, RequestListQuery } from '@app/analytic/models/analytic-request.model';
import {
  AnalyticsFilterInput,
  ResultListModel,
  SearchSearchInput
} from '@app/analytic/models/analytic-result.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(
    private apollo: Apollo,
    private helpersService: HelpersService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  updateResultList(listQuery: SearchSearchInput) {
    const { ...restFilters } = listQuery;
    let input = {
      ...restFilters
    };

    input = this.helpersService.cleanEmptyKeys(input);
    const getResultList = gql(`
      query getAnalyticResults($input: SearchSearchInput) {
        getAnalyticResults (input: $input){
          requestId
          value {
            items{
              label
              crawlingDate,
              documentId,
              keywords,
              postDate,
              resourceLink,
              statistics {
                sentiment
              }
              summaryLines,
              title,
              type,
              contentType,
              index,
              reactions {
                type
                count
              }
              repostsCount,
              commentsCount
            },
            totalItemCount
          }
        }
      }
    `);

    return this.apollo.query({
      query: getResultList,
      variables: {
        input
      }
    }).pipe(
      map((response: any): ResultListModel => {
        const items = response.data.search.value.items.map(item => ({
          id: `${item.index}_${item.documentId}`,
          ...item
        }));
        return {
          items,
          totalItemCount: response.data.search.value.totalItemCount,
          id: response.data.search.requestId
        };
      }));
  }

  updateRequestList(listQuery: RequestListQuery) {
    let input = {
      ...listQuery
    };

    input = this.helpersService.cleanEmptyKeys(input);

    const getAnalyticRequests = gql(`
      query getAnalyticsRequests($input: AnalyticsRequestsListQueryInput) {
        getAnalyticsRequests (input: $input){
          totalItemCount
          items {
            resourceType
            id
            query
            requestDate
            zoneOffset
          }
        }
      }
    `);

    return this.apollo.query({
      query: getAnalyticRequests,
      variables: {
        input
      }
    }).pipe(map((response: any) => {
      return {
        items: response.data.getAnalyticsRequests.items,
        totalItemCount: response.data.getAnalyticsRequests.totalItemCount
      };
    }));
  }

  getAnalyticsRequest(id: number) {
    const getAnalyticRequest = gql(`
      query getAnalyticsRequest($id: Long!) {
        getAnalyticsRequest (id: $id){
          filter {
            fromDate
            scale
            toDate
          }
          id
          query
          requestDate
          zoneOffset
        }
      }
    `);

    return this.apollo.query({
      query: getAnalyticRequest,
      variables: {
        id
      }
    }).pipe(map((response: any): GetRequestOutput => {
      return response.data.getAnalyticsRequest;
    }));
  }

  saveAnalyticsRequest(listQuery: AnalyticsFilterInput) {
    const { ...restFilters } = listQuery;
    let input = {
      ...restFilters
    };

    input = this.helpersService.cleanEmptyKeys(input);

    const saveSearch = gql(`
      mutation saveAnalyticsRequest($input: AnalyticsRequestInput) {
        saveAnalyticsRequest(input: $input)
      }
    `);

    return this.apollo.mutate<any>({
      mutation: saveSearch,
      variables: {
        input
      }
    })
      .pipe(map((response: any) => {
        return { id: response.data.saveAnalyticsRequest };
      }));
  }

  externalSearchRequest(id: number) {
    const externalSearch = gql(`
      mutation externalSearch($input: Long!) {
        externalSearch(input: $input) {
          externalSearch {
            countToProcess
            status
            totalResultsCount
          }
          filter {
            fromDate
            resourceTypes
            resultTypes
            toDate
          }
          id
          query
          searchDate
          zoneOffset
        }
      }
    `);

    return this.apollo.mutate<any>({
      mutation: externalSearch,
      variables: {
        input: id
      }
    }).pipe(map((response: any): GetRequestOutput => response.data.externalSearch));
  }

  cancelExternalSearch(id: number) {
    const cancelSearch = gql(`
      mutation cancelExternalSearch($input: Long!) {
        cancelExternalSearch(input: $input) {
          externalSearch {
            countToProcess
            status
            totalResultsCount
          }
          filter {
            fromDate
            resourceTypes
            resultTypes
            toDate
          }
          id
          query
          searchDate
          zoneOffset
        }
      }
    `);

    return this.apollo.mutate<any>({
      mutation: cancelSearch,
      variables: {
        input: id
      }
    })
      .pipe(map((response: any): GetRequestOutput => {
        return response.data.cancelExternalSearch;
      }));
  }

  openSnackBar(data: any, component = null, options = {}) {
    return this.snackBar.openFromComponent(component || SnackBarComponent, {
      data,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: data.type || '',
      ...options
    });
  }
}
