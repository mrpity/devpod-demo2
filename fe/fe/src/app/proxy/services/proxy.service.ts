import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/internal/operators';
import {HelpersService} from '../../shared/services/helpers.service';
import {Proxy, ProxyAddModel, ProxyListQueryModel, ProxyLocationInput} from '../models/proxy.interface';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(
    private apollo: Apollo,
    private helpersService: HelpersService,
  ) {}

  prepareSortingForRequest(sortBy) {
    return sortBy.field
      ? {
          field: sortBy.field,
          order: sortBy.asc ? 'ASC' : 'DESC'
        }
      : null;
  }

  addProxy(proxyDetails: ProxyAddModel) {
    const addProxy = gql(`
      mutation addProxy($input: ProxySettingsInput) {
        addProxy (input: $input)
      }
    `);

    let input = {
      ...proxyDetails,
      country: null,
      city: null
    };

    input = this.helpersService.removeEmptyKeys(input);

    return this.apollo.mutate({
      mutation: addProxy,
      variables: {
        input
      }
    });
  }

  deleteProxy(id: string) {
    const addProxy = gql(`
      mutation removeProxy($input:[Long]!) {
        removeProxy (input: $input)
      }
    `);

    return this.apollo.mutate({
      mutation: addProxy,
      variables: {
        input: id
      }
    });
  }

  modifyProxy(data) {
    const modifyProxy = gql(`
      mutation updateProxy($input: ProxySettingsInput) {
        updateProxy (input: $input)
      }
    `);

    let input = {
      ...data,
      country: null,
      city: null
    };

    input = this.helpersService.removeEmptyKeys(input);

    return this.apollo.mutate({
      mutation: modifyProxy,
      variables: {
        input
      }
    });
  }

  updateProxyList(listQuery: ProxyListQueryModel) {
    const { sortBy, ...restFilters } = listQuery;
    const input = {
      ...restFilters,
      sorting: this.prepareSortingForRequest(sortBy)
    };

    const getProxyList = gql(`
      query getProxyList($input: ProxyListQueryInput!) {
        getProxyList (input: $input){
          items{
            id,
            country,
            city,
            type,
            protocol,
            host,
            port,
            description
          },
          totalItemCount
        }
      }
    `);

    return this.apollo.watchQuery<any>({
      query: getProxyList,
      variables: {
        input
      }
    })
    .valueChanges
    .pipe(map((response) => {
      return { proxies: response.data['getProxyList'].items, totalItemCount: response.data['getProxyList'].totalItemCount };
    }));
  }

  getAllProxySettings() {
    const query = gql(`
      query {
        getAllProxyCountries {
          value
        }
        getProxyTypes {
          types
        }
      }
    `);
    return this.apollo.watchQuery<any>({
      query,
    })
    .valueChanges
    .pipe(
      map((result): any => {
        return result.data;
      }));
  }

  getProxyDetails(id) {
    const query = gql(`
      query getProxyDetails($proxyId: Long!) {
        getProxyDetails (proxyId: $proxyId){
          id,
          country,
          city,
          type,
          description,
          credentials {
            login,
            password,
          }
          url {
            host,
            port,
            protocol
          }
        }
      }
    `);
    return this.apollo.query({
      query,
      variables: {
        proxyId: id
      }
    }).pipe(map(res => {
      let newRes = {...res.data['getProxyDetails']};
      newRes = this.helpersService.removeEmptyKeys(newRes);
      return newRes;
    }));
  }

  findProxyLocation(proxyData: ProxyLocationInput) {
    const input = {...proxyData};
    const query = gql(`
      query getProxyLocation ($input: ProxyLocationInput!) {
        getProxyLocation (input: $input) {
          country,
          countryCode,
          city
        }
      }
    `);

    return this.apollo.query({
      query,
      variables: {
        input
      }
    }).pipe(map((res: any) => res.data.getProxyLocation));
  }
}
