import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators';
import { HelpersService } from '@app/shared/services/helpers.service';
import { GetRequestOutput, RequestListQuery } from '@app/search/models/request.model';
import { ContentTypeEnum, ResultListModel, SearchRequestInput, SearchSearchInput } from '@app/search/models/result.model';
import { PostOutput, ResultDocumentInput } from '@app/search/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileOutput } from '../models/profile.model';
import { WebPageOutput } from '@app/search/models/webpage.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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
      query search($input: SearchSearchInput) {
        search (input: $input){
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

    const getSearchRequests = gql(`
      query getSearchRequests($input: SearchRequestListQueryInput) {
        getSearchRequests (input: $input){
          totalItemCount
          items {
            resourceTypes
            externalSearch {
              countToProcess
              status
              totalResultsCount
            }
            id
            query
            searchDate
            zoneOffset
          }
        }
      }
    `);

    return this.apollo.query({
      query: getSearchRequests,
      variables: {
        input
      }
    }).pipe(map((response: any) => {
      return {
        items: response.data.getSearchRequests.items,
        totalItemCount: response.data.getSearchRequests.totalItemCount
      };
    }));
  }

  getSearchRequest(id: number) {
    const getSearchRequest = gql(`
      query getSearchRequest($id: Long!) {
        getSearchRequest (id: $id){
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
          externalSearch {
            countToProcess
            status
            totalResultsCount
          }
        }
      }
    `);

    return this.apollo.query({
      query: getSearchRequest,
      variables: {
        id
      }
    }).pipe(map((response: any): GetRequestOutput => {
      return response.data.getSearchRequest;
    }));
  }

  saveSearchRequest(listQuery: SearchRequestInput) {
    const { ...restFilters } = listQuery;
    let input = {
      ...restFilters
    };

    input = this.helpersService.cleanEmptyKeys(input);

    const saveSearch = gql(`
      mutation saveSearchRequest($input: SearchRequestInput) {
        saveSearchRequest(input: $input)
      }
    `);

    return this.apollo.mutate<any>({
      mutation: saveSearch,
      variables: {
        input
      }
    })
      .pipe(map((response: any) => {
        return { id: response.data.saveSearchRequest };
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

  getPostRequest(data: ResultDocumentInput) {
    const input = {
      ...data
    };
    const getPostRequest = gql(`
      query getPost($input: DocumentInput!) {
        getPost(input: $input){
          type
          dates
          emails
          hashtags
          locations
          organizations
          persons
          phones
          sharedPostLink
          urls
          users
          authorFeeling
          authorName
          sentimentLabel
          crawledBy
          authorUrl
          documentId
          index
          resourceLink
          repostsCount
          commentsCount
          crawlingDate
          summary
          keywords
          postDate
          statistics {
           sentiment
          }
          reactions {
            type
            count
            users {
              name
              url
            }
          }
          reposts{
            name
            url
          }
          comments {
            url
            body
            updateDateTime
            creationDateTime
            level
            authorUrl
            authorName
            answerToUserUrl
            reactions {
              type
              count
              users {
                name
                url
              }
            }
          }
        }
      }
    `);

    return this.apollo.query({
      query: getPostRequest,
      variables: {
        input
      }
    }).pipe(map((response: any): PostOutput => {
      if (response.errors && !response.data.getPost) {
        const error = response.errors[0].message;
        throw new Error(error);
      }
      return response.data.getPost;
    }));
  }

  findOriginDocuments(data: ResultDocumentInput) {
    const input = {
      ...data
    };
    const getOriginDocumentsRequest = gql(`
      query findOriginDocuments($input: DocumentInput!) {
        findOriginDocuments(input: $input){
          type
          contentType
          documentId
          index
          title
          resourceLink
          repostsCount
          commentsCount
          crawlingDate
          summaryLines
          keywords
          postDate
          statistics {
           sentiment
          }
          reactions {
            type
            count
          }
        }
      }
    `);

    return this.apollo.query({
      query: getOriginDocumentsRequest,
      variables: {
        input
      }
    }).pipe(map((response: any): any => {
      if (response.errors && !response.data.getPost) {
        const error = response.errors[0].message;
        throw new Error(error);
      }
      return response.data.findOriginDocuments;
    }));
  }

  getProfile(data: ResultDocumentInput) {
    const input = {
      ...data
    };
    const getProfileRequest = gql(`
      query getProfile($input: DocumentInput!) {
        getProfile(input: $input) {
          index
          type
          crawlingDate
          documentId
          profileUrl
          profileId
          profileAlias
          profilePhotoPath
          firstName
          middleName
          lastName
          joinedFacebook
          birthDate
          gender
          languages
          bio
          websites
          socialLinks
          phones
          email
          maritalStatus
          politicalViews
          religiousViews
          familyMembers
          favoriteAnimals
          favoriteCarsAndMotorcycles
          favoriteBooks
          favoriteFoods
          favoriteGames
          favoriteMovies
          favoriteMusic
          favoriteSports
          favoriteTvShows
          favoriteHealthAndBeauty
          favoriteSciences
          favoriteTravelsAndTourism
          otherInterests
          occupations
          armyList
          educations
          professionalSkills
          livesInLocations
          fromLocations
          friends {
            name
            url
          }
        }
      }
    `);

    return this.apollo.query({
      query: getProfileRequest,
      variables: {
        input
      }
    }).pipe(map((response: any): ProfileOutput => {
      if (response.errors && !response.data.getProfile) {
        const error = response.errors[0].message;
        throw new Error(error);
      }
      return response.data.getProfile;
    }));
  }

  getProfilePhotoRequest(path: string) {
    const getProfilePhotoRequest = gql(`
      query getProfilePhoto($path: String!) {
        getProfilePhoto(path: $path) {
          profilePhotoBase64
        }
      }
    `);

    return this.apollo.query({
      query: getProfilePhotoRequest,
      variables: {
        path
      }
    }).pipe(map((response: any): string => {
      if (response.errors && !response.data.getProfile) {
        const error = response.errors[0].message;
        throw new Error(error);
      }
      return response.data.getProfilePhoto.profilePhotoBase64;
    }));
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

  getWebPage(data: ResultDocumentInput) {
    const input = {
      ...data
    };
    const getWebPageRequest = gql(`
      query getWebPage($input: DocumentInput!) {
        getWebPage(input: $input) {
          crawlingDate
          dates
          documentId
          emails
          hashtags
          index
          keywords
          language
          locations
          organizations
          persons
          publicationDate
          publicationLink
          sentimentLabel
          phones
          sourceLink
          summary
          title
          type
          urls
          users
        }
      }
    `);

    return this.apollo.query({
      query: getWebPageRequest,
      variables: {
        input
      }
    }).pipe(map((response: any): WebPageOutput => {
      if (response.errors && !response.data.getProfile) {
        const error = response.errors[0].message;
        throw new Error(error);
      }
      return response.data.getWebPage;
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

  getDocumentData(
    type: ContentTypeEnum,
    input: ResultDocumentInput
  ): Observable<ProfileOutput | PostOutput | WebPageOutput> {
    switch (type) {
      case ContentTypeEnum.post: {
        return this.getPostRequest(input);
      }
      case ContentTypeEnum.webpage: {
        return this.getWebPage(input);
      }
      case ContentTypeEnum.profile: {
        return this.getProfile(input);
      }
    }
  }
}
