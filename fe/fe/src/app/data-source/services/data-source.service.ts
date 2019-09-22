import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  DataSourceCreateInterface,
  DataSourceStatisticOutput, DocumentInfoOutput,
  ProxyRegionInterface
} from '../models/data-source-crud.model';
import { DataSourcesBatchInput, DataSourceListQuery, DataSourceGQLResponse } from '../models/data-source.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';


@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  proxy: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  detail = new Subject();
  statistic = new Subject();
  edit = new Subject();

  constructor(
    private apollo: Apollo,
    private helpers: HelpersService,
    private snackBar: MatSnackBar
  ) { }

  get getEdit() {
    return this.edit.asObservable();
  }

  private getDataSourceListQuery = gql(`
    query getDataSources($input: DataSourcesQueryInput) {
      getDataSources(input: $input) {
        totalItemCount
        items{
          id
          status
          type
          url
          createdAt
          createdBy
          crawledAt
          crawledBy
          enabled
        }
      }
    }
  `);

  private getDataSourceListStatusesQuery = gql(`
    query getDataSources($input: DataSourcesQueryInput) {
      getDataSources(input: $input) {
        totalItemCount
        items{
          id
          status
        }
      }
    }
  `);

  private createDataSourceQuery = gql(`
    mutation addDataSource($input:DataSourceInput) {
      addDataSource (input: $input)
    }
  `);

  private createDataSourcesInBatchQuery = gql(`
    mutation addDataSourcesInBatch($input: DataSourcesBatchInput) {
      addDataSourcesInBatch(input: $input) {
        batchItemOutputs {
          id,
          resource
        }
      }
    }`
  );

  private updateDataSourceQuery = gql(`
    mutation updateDataSource($input:DataSourceInput) {
      updateDataSource (input: $input)
    }
  `);

  private deleteDataSourceQuery = gql(`
    mutation removeDataSources($input:[Long]!) {
      removeDataSources (input: $input)
    }
  `);

  private getProxyCountriesQuery = gql(`
    query {
      getProxies {
        regions{
          cities,
          country,
          countryCode
        }
      }
    }
  `);

  private getDataSourceAndProxiesQuery = gql(`
    query getDataSourceDetails($datasourceId: Long!) {
      getDataSourceDetails(datasourceId: $datasourceId) {
        automationRules {
          activeTimeFrom
          activeTimeTo
          dayOfMonth
          daysOfWeek
          expirationDate
          frequency
          id
          maxConnections
          onceDate
          zoneOffset
        }
        createdAt
        createdBy
        enabled
        id
        depth
        profileId
        proxyCountryCode
        proxyCity
        type
        url
        crawlMedia
        index
        documentId
        contentType
      }
      getProxies {
        regions{
          cities,
          country,
          countryCode
        }
      }
    }
  `);

  private getDataSourceStatisticQuery = gql(`
    query getDataSourceStatistic($datasourceId: Long!) {
      getDataSourceStatistic(datasourceId: $datasourceId) {
        total,
        succeeded,
        failed,
        sessions {
          message
          messageKey
          resource
          status
          updatedAt
          avatarFullName
          resourceLogs {
            message
            messageKey
            resource
            status
            updatedAt
            avatarFullName
            resourceLogs {
              message
              messageKey
              resource
              status
              updatedAt
              avatarFullName
            }
          }
        }
      }
    }
  `);


  private changeDataSourceStateQuery = gql(`
    mutation changeDataSourceState($state: DataSourceStateInput) {
      changeDataSourceState(state: $state)
    }
  `);

  private getProxyRegionQuery = gql(`
    query getProxyRegion($countryCode: CountryCode!) {
      getProxyRegion(countryCode: $countryCode) {
        cities,
        country,
        countryCode
      }
    }
  `);

  private getDocumentInfo = gql(`
    query getDocumentInfo($datasourceId: Long!) {
      getDocumentInfo(datasourceId: $datasourceId) {
        contentType,
        documentId,
        index
      }
    }
  `);

  prepareSortingForRequest(sortBy) {
    return sortBy.field
      ? {
          field: sortBy.field,
          order: sortBy.asc ? 'ASC' : 'DESC'
        }
      : null;
  }

  add(data: DataSourceCreateInterface) {
    return this.apollo.mutate({
      mutation: this.createDataSourceQuery,
      variables: {
        input: data,
      },
    }).pipe(
      map((result: DataSourceGQLResponse) => result.data.addDataSource),
      filter(result => Boolean(result))
    );
  }

  update(data) {
    return this.apollo.mutate({
      mutation: this.updateDataSourceQuery,
      variables: {
        input: data,
      },
    }).pipe(
      map((result: DataSourceGQLResponse) => result.data.updateDataSource),
      filter(result => !!result)
    );
  }

  delete(dataSourceIds) {
    return this.apollo.mutate({
      mutation: this.deleteDataSourceQuery,
      variables: {
        input: dataSourceIds,
      }
    });
  }

  getDataSourceList(listQuery: DataSourceListQuery) {
    const { sortBy, ...restFilters } = listQuery;

    // Convert sortBy to sorting for request
    const input = {
      ...restFilters,
      sorting: [this.prepareSortingForRequest(sortBy)],
    };

    return this.apollo.watchQuery<any>({
      query: this.getDataSourceListQuery,
      variables: {
        input
      }
    })
      .valueChanges
      .pipe(
        map((result): any => {
          return result.data.getDataSources;
        })
      );
  }

  getDataSourceListStatuses(listQuery) {
    const { sortBy, ...restFilters } = listQuery;

    // Convert sortBy to sorting for request
    const input = {
      ...restFilters,
      sorting: [this.prepareSortingForRequest(sortBy)],
    };

    return this.apollo.watchQuery<any>({
      query: this.getDataSourceListStatusesQuery,
      variables: {
        input
      }
    })
      .valueChanges
      .pipe(
        map((result): any => {
          return result.data.getDataSources;
        })
      );
  }

  getProxyCountriesList() {
    return this.apollo.query({
      query: this.getProxyCountriesQuery,
    })
      .pipe(
        map((result: any): ProxyRegionInterface[] => {
          return result.data.getProxies.regions;
        })
      );
  }

  getDataSourceAndProxies(datasourceId) {
    return this.apollo.query({
      query: this.getDataSourceAndProxiesQuery,
      variables: {
        datasourceId
      }
    })
      .pipe(
        map((result: any) => {
          const currentProxy = result.data.getProxies.regions.find(
            item => item.countryCode === result.data.getDataSourceDetails.proxyCountryCode
          );
          return {
            generalInfo: {
              ...result.data.getDataSourceDetails,
              proxyCountry: currentProxy ? currentProxy.country : null
            },
            regions: result.data.getProxies.regions
          };
        })
      );
  }

  getDataSourceStatistic(datasourceId) {
    return this.apollo.query({
      query: this.getDataSourceStatisticQuery,
      variables: {
        datasourceId
      }
    })
      .pipe(
        map((result: any): DataSourceStatisticOutput => {
          return result.data.getDataSourceStatistic;
        })
      );
  }

  changeState(enabled: boolean, id: number) {
    return this.apollo.mutate({
      mutation: this.changeDataSourceStateQuery,
      variables: {
        state: {
          enabled,
          id
        }
      },
    }).pipe(
      map((result: DataSourceGQLResponse) => result.data.changeDataSourceState),
      filter(result => !!result)
    );
  }

  addDataSourcesInBatch(data: DataSourcesBatchInput) {
    let input = {
      ...data
    };

    input = this.helpers.cleanEmptyKeys(input);

    return this.apollo.mutate<any>({
      mutation: this.createDataSourcesInBatchQuery,
      variables: {
        input
      }
    })
      .pipe(
        map((result: any) => result.data.addDataSourcesInBatch.batchItemOutputs)
      );
  }

  getProxyRegion(countryCode) {
    return this.apollo.watchQuery<any>({
      query: this.getProxyRegionQuery,
      variables: {
        countryCode
      }
    })
      .valueChanges
      .pipe(
        map((result: any): ProxyRegionInterface => {
          return result.data.getProxyRegion;
        })
      );
  }

  openSnackBar(data: any, component = null, options = {}) {
    return this.snackBar.openFromComponent(component || SnackBarComponent, {
      data,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: data.type || '',
      ...options
    });
  }

  getDocumentInfoQuery(datasourceId) {
    return this.apollo.query({
      query: this.getDocumentInfo,
      variables: {
        datasourceId
      }
    })
      .pipe(
        map((result: any): DocumentInfoOutput => {
          return result.data.getDocumentInfo;
        })
      );
  }
}
