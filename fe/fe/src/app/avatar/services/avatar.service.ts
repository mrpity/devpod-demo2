import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/internal/operators';
import { AvatarListQueryModel, AvatarGQLResponce } from '../models/avatar.model';
import { HelpersService } from '../../shared/services/helpers.service';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvatarStatus, AvatarConnectionStatus } from '../avatar.enums';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private apollo: Apollo,
    private helpersService: HelpersService,
    private snackBar: MatSnackBar
  ) {}

  prepareSortingForRequest(sortBy) {
    return sortBy.field
      ? {
          field: sortBy.field,
          order: sortBy.asc ? 'ASC' : 'DESC'
        }
      : null;
  }

  prepareFilters(storeFilter) {
    const filter = {
      ...storeFilter
    };
    if (!!filter.createdAtTo) {
      filter.createdAtTo = this.helpersService.addDay(filter.createdAtTo);
    } else if (!!filter.modifiedAtTo) {
      filter.modifiedAtTo = this.helpersService.addDay(filter.modifiedAtTo);
    }
    return filter;
  }

  createAvatar(avatarDetails) {
    const createAvatar = gql(`
      mutation createAvatar($input: AvatarInput!) {
          createAvatar (input: $input)
      }
    `);

    const input = this.formatAvatarFormData(avatarDetails);

    return this.apollo.mutate({
      mutation: createAvatar,
      variables: {
        input
      }
    });
  }

  modifyAvatar({ id, avatarDetails }) {
    const modifyAvatar = gql(`
      mutation modifyAvatar($avatarId: Long!, $input: AvatarInput!) {
          modifyAvatar (avatarId: $avatarId, input: $input)
      }
     `);

    const input = this.formatAvatarFormData(avatarDetails);
    delete input['createdAt'];
    delete input['modifiedAt'];
    delete input['state'];

    return this.apollo.mutate({
      mutation: modifyAvatar,
      variables: {
        input,
        avatarId: id
      }
    });
  }

  updateAvatarList(listQuery: AvatarListQueryModel) {
    const { sortBy, filter, ...restFilters } = listQuery;

    // Convert sortBy to sorting for request
    const input = {
      ...restFilters,
      sorting: this.prepareSortingForRequest(sortBy),
      filter: this.prepareFilters(filter)
    };

    const getAvatarList = gql(`
      query getAvatarList($input: AvatarListQueryInput!) {
          getAvatarList (input: $input){
            items{
                id,
                firstName,
                lastName,
                middleName,
                type,
                createdAt,
                modifiedAt,
                profilePicBase64,
                connections{
                  type,
                  state
                }
            },
            totalItemsCount
          }
      }
    `);

    return this.apollo.query({
      query: getAvatarList,
      variables: {
        input
      }
    })
    .pipe(map((response) => {
      let avatarList = [];
      if (response.data['getAvatarList']) {
        avatarList = response.data['getAvatarList'].items.map((item) => {
          return {
            id: item.id,
            name: item.lastName + ' ' + item.firstName + ' ' + (item.middleName ? item.middleName : ''),
            type: item.type,
            connections: item.connections.reduce((res, sn) => {
              res[sn.type] = sn.state === AvatarConnectionStatus.LINKED;
              return res;
            }, {}),
            createdAt: item.createdAt,
            modifiedAt: item.modifiedAt,
            profilePicBase64: item.profilePicBase64
          };
        });
      }
      return { avatars: avatarList, totalItemsCount: response.data['getAvatarList'].totalItemsCount };
    }));
  }

  getAvatarDetails(id) {
    const query = gql(`
      query ($avatarId: Long!) {
          getAvatarDetails (avatarId:$avatarId){
						bio,
            birthDate,
            createdAt,
            emails,
            favoriteBooks,
            favoriteMovies,
            favoriteMusic,
            favoriteTvShows,
            favoriteSports,
            favoriteAppsAndGames,
            firstName,
            fromLocation{
              city,
              country
            },
            gender,
            languages,
            lastName,
            livesInLocation{
              city,
              country
            },
            maritalStatus,
            middleName,
            modifiedAt,
            phones,
            politicalViews,
            professionalSkills,
            profilePicBase64,
            profilePicName,
            religiousViews,
            socialLinks,
            state,
            type,
            websites,
            educations{
              name,
              city,
              description,
              studiedFrom,
              studiedTo,
              specialization,
              type
            }
          }
        }
     `);
    return this.apollo.query({
      query,
      variables: {
        avatarId: id
      }
    }).pipe(map(res => res.data['getAvatarDetails']));
  }

  getAvatarCurrentState(id) {
    const query = gql(`
      query ($avatarId: Long!) {
        getAvatarDetails (avatarId:$avatarId){
          state
        }
      }
    `);
    return this.apollo.query({
      query,
      variables: {
        avatarId: id
      }
    }).pipe(map(res => res.data['getAvatarDetails']));
  }

  getAvatarActivityLog(id) {
    const query = gql(`
      query ($avatarId: Long!) {
        getAvatarLog (avatarId:$avatarId) {
          entries{
            error,
            createdAt,
            entryType,
            snType
          }
        }
      }
    `);
    return this.apollo.query({
      query,
      variables: {
        avatarId: id
      }
    }).pipe(map(res => res.data['getAvatarLog'].entries));
  }

  getAvatarConnections(id) {
    const query = gql(`
      query($avatarId: Long!) {
        getAvatarConnections(avatarId: $avatarId) {
          connections {
            state,
            firstName,
            lastName,
            login,
            middleName,
            password,
            phone,
            profilePicBase64,
            type,
            proxyCountryCode,
            proxyCity
          }
        }
        getProxies {
          regions {
            country,
            cities,
            countryCode
          }
        }
      }
    `);
    return this.apollo.query({
      query,
      variables: {
        avatarId: id
      }
    }).pipe(map(res => res.data));
  }

  getAvatarImportDiff(id) {
    const query = gql(`
      query getAvatarImportDiff ($avatarId: Long!) {
        getAvatarImportDiff (avatarId: $avatarId) {
          bio{
            current,
            erroneous,
            imported
          },
          birthDate{
            current,
            erroneous,
            imported
          },
          emails{
            current,
            erroneous,
            imported
          },
          favoriteBooks{
            current,
            erroneous,
            imported
          },
          favoriteMovies{
            current,
            erroneous,
            imported
          },
          favoriteMusic{
            current,
            erroneous,
            imported
          },
          favoriteTvShows{
            current,
            erroneous,
            imported
          },
          favoriteSports{
            current,
            erroneous,
            imported
          },
          favoriteAppsAndGames{
            current,
            erroneous,
            imported
          },
          firstName{
            current,
            erroneous,
            imported
          },
          fromLocation{
            current{
              city,
              country
            },
            erroneous,
            imported{
              city,
              country
            }
          },
          gender{
            current,
            erroneous,
            imported
          },
          languages{
            current,
            erroneous,
            imported
          },
          lastName{
            current,
            erroneous,
            imported
          },
          livesInLocation{
            current{
              city,
              country
            },
            erroneous,
            imported{
              city,
              country
            }
          },
          maritalStatus{
            current,
            erroneous,
            imported
          },
          middleName{
            current,
            erroneous,
            imported
          },
          phones{
            current,
            erroneous,
            imported
          },
          politicalViews{
            current,
            erroneous,
            imported
          },
          profilePicBase64{
            current,
            erroneous,
            imported
          },
          religiousViews{
            current,
            erroneous,
            imported
          },
          socialLinks{
            current,
            erroneous,
            imported
          },
          websites{
            current,
            erroneous,
            imported
          }
        }
      }
    `);
    return this.apollo.query({
      query,
      variables: {
        avatarId: id
      }
    }).pipe(map((res: any) => {
      if (res.errors) {
        throw new Error(res.errors);
      }
      return res.data.getAvatarImportDiff;
      })
    );
  }

  getAvatarExportSummary(id) {
    const query = gql(`
      query getAvatarExportStatus ($avatarId: Long!) {
        getAvatarExportStatus (avatarId: $avatarId) {
          statuses{
            type,
            error,
            fields{
              error,
              name,
              status
            }
          }
        }
      }
    `);

    return this.apollo.query({
      query,
      variables: {
        avatarId: id
      }
    }).pipe(map((res: any) => res.data.getAvatarExportStatus.statuses));
  }

  finishAvatarExport(id) {
    const mutation = gql(`
      mutation finishAvatarExport ($avatarId: Long!) {
        finishAvatarExport (avatarId: $avatarId)
      }
    `);

    return this.apollo.mutate({
      mutation,
      variables: {
        avatarId: id
      }
    }).pipe(map((res: any) => res.data.finishAvatarExport));
  }

  setupAvatarConnection(avatarId, connectionDetails) {
    const mutation =  gql(`
      mutation setupAvatarConnection($avatarId: Long!, $connection: AvatarConnectionInput!) {
        setupAvatarConnection (avatarId: $avatarId, connection: $connection) {
            success,
            state,
            errorType,
            errorMessage
        }
      }
    `);

    const connection = this.helpersService.removeEmptyKeys(connectionDetails);

    return this.apollo.mutate({
      mutation,
      variables: {
        connection,
        avatarId
      }
    }).pipe(map((res: AvatarGQLResponce) => res.data.setupAvatarConnection));
  }

  importAvatarProfile({ id, sn }) {
    const mutation =  gql(`
      mutation importAvatarProfile($avatarId: Long!, $source: SnType!) {
        importAvatarProfile (avatarId: $avatarId, source: $source)
      }
    `);

    return this.apollo.mutate({
      mutation,
      variables: {
        avatarId: id,
        source: sn
      }
    }).pipe(map((res: AvatarGQLResponce) => res.data.importAvatarProfile));
  }

  confirmAvatarImport(id, fields) {
    const mutation =  gql(`
      mutation confirmAvatarImport($avatarId: Long!, $fields: [String]) {
        confirmAvatarImport (avatarId: $avatarId, fields: $fields)
      }
    `);

    return this.apollo.mutate({
      mutation,
      variables: {
        avatarId: id,
        fields
      }
    }).pipe(map((res: AvatarGQLResponce) => res.data.confirmAvatarImport));
  }

  declineAvatarImport(id) {
    const mutation =  gql(`
      mutation declineAvatarImport($avatarId: Long!) {
        declineAvatarImport (avatarId: $avatarId)
      }
    `);

    return this.apollo.mutate({
      mutation,
      variables: {
        avatarId: id
      }
    }).pipe(map((res: AvatarGQLResponce) => res.data.declineAvatarImport));
  }

  exportAvatarProfile({ id, targets, fields }) {
    const mutation =  gql(`
      mutation exportAvatarProfile($avatarId: Long!, $input: ExportInput!) {
        exportAvatarProfile (avatarId: $avatarId, input: $input)
      }
    `);

    return this.apollo.mutate({
      mutation,
      variables: {
        avatarId: id,
        input: {
          targets,
          fields
        }
      }
    }).pipe(map((res: AvatarGQLResponce) => res.data.exportAvatarProfile));
  }

  searchCities(searchQuery) {
    const query =  gql(`
      query searchCities($input: SearchInput!) {
        searchCities (input: $input) {
          cities{
            name,
            country
          },
        }
      }
    `);
    const input = {
      locale: 'ru_RU',
      query: searchQuery,
      limit: 10
    };

    return this.apollo.query({
      query,
      variables: {
        input
      }
    }).pipe(
      map(res => res.data['searchCities'].cities
        .map(city => ({
          city: city.name,
          country: city.country
        }))
      )
    );
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

  setImportExportType(status, type) {
    return (
      status === AvatarStatus.EXPORT_PREVIEW ||
      status === AvatarStatus.EXPORT ||
      status === AvatarStatus.EXPORT_REVIEW ||
      (status === AvatarStatus.AVAILABLE && type === 'export')
    ) ? 'export' : 'import';
  }

  setImportExportProcessing(status) {
    return (
      status === AvatarStatus.FACEBOOK_IMPORT ||
      status === AvatarStatus.ODNOKLASSNIKI_IMPORT ||
      status === AvatarStatus.EXPORT
    );
  }

  setImportExportAwaitingConfirmation(status) {
    return (
      status === AvatarStatus.FB_IMPORT_CONFIRMATION ||
      status === AvatarStatus.OK_IMPORT_CONFIRMATION ||
      status === AvatarStatus.EXPORT_REVIEW
    );
  }

  formatAvatarFormData(details) {
    const input = {
      ...details,
      birthDate: this.helpersService.formatDateOnly(details.birthDate)
    };

    if (input.languages.length !== 0) {
      input.languages = input.languages.map(item => item.id);
    }

    if (input.educations.length !== 0) {
      input.educations = input.educations.slice().map(item => ({
        ...item,
        studiedFrom: this.helpersService.formatDateOnly(item.studiedFrom),
        studiedTo: this.helpersService.formatDateOnly(item.studiedTo)
      }));
    }
    return this.helpersService.removeEmptyKeys(input);
  }
}
