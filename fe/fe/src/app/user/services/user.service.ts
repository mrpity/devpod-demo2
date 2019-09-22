import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators';
import { UserListQueryModel, User } from '../models/user.model';
import { HelpersService } from '../../shared/services/helpers.service';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo,
    private helpersService: HelpersService,
    private snackBar: MatSnackBar
  ) { }

  prepareSortingForRequest(sortBy) {
    return sortBy.field
      ? {
        field: sortBy.field,
        order: sortBy.asc ? 'ASC' : 'DESC'
      }
      : null;
  }

  createUser(userDetails: User) {
    const createUserRequest = gql(`
      mutation createUser($input: UserInput!) {
        createUser(input: $input) {
          id,
          error
        }
      }
    `);

    let input = {
      ...userDetails
    };

    input = this.helpersService.removeEmptyKeys(input);

    return this.apollo.mutate({
      mutation: createUserRequest,
      variables: {
        input
      }
    })
      .pipe(
        map((res: any) => {
          if (res.data.createUser.error) {
            throw new Error(res.data.createUser.error);
          }
          return res.data.createUser;
        })
      );
  }

  modifyUser(userDetails: User) {
    const modifyUserRequest = gql(`
      mutation modifyUser($id: Long!, $input: UserInput!) {
        modifyUser(id: $id, input: $input)
      }
    `);

    let input = {
      ...userDetails,
    };
    delete input.createdAt;
    delete input.modifiedAt;
    delete input.id;

    input = this.helpersService.removeEmptyKeys(input);

    return this.apollo.mutate({
      mutation: modifyUserRequest,
      variables: {
        input,
        id: userDetails.id
      }
    });
  }

  getUserList(listQuery: UserListQueryModel) {
    const { sortBy, ...restFilters } = listQuery;

    // Convert sortBy to sorting for request
    const input = {
      ...restFilters,
      sorting: this.prepareSortingForRequest(sortBy)
    };

    const getUserListRequest = gql(`
      query getUserList($input: UserListQueryInput!) {
        getUserList(input: $input) {
          items {
            id,
            firstName,
            lastName,
            middleName,
            email,
            role,
            createdAt,
            modifiedAt
          },
          totalItemsCount
        }
      }
    `);

    return this.apollo.query({
      query: getUserListRequest,
      variables: {
        input
      }
    })
      .pipe(map((response: any) => {
        let items = [];
        if (response.data.getUserList) {
          items = response.data.getUserList.items.map((item) => {
            return {
              ...item,
              name: item.lastName + ' ' + item.firstName + ' ' + (item.middleName || '')
            };
          });
        }
        return { items, totalItemsCount: response.data.getUserList.totalItemsCount };
      }));
  }

  getUserDetails(id: number) {
    const getUserDetailsRequest = gql(`
      query getUser($id: Long!) {
        getUser(id:$id) {
          id,
          enabled,
          firstName,
          lastName,
          middleName,
          email,
          role,
          createdAt,
          modifiedAt
        }
      }
    `);
    return this.apollo.query({
      query: getUserDetailsRequest,
      variables: {
        id
      }
    }).pipe(map((res: any) => ({
        ...res.data.getUser,
        // name: res.data.getUser.lastName + ' ' + res.data.getUser.firstName + ' ' + (res.data.getUser.middleName || '')
      })
    ));
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
}
