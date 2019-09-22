import { combineReducers, ActionReducerMap } from '@ngrx/store';
import {
  AvatarListActions,
  AvatarCrudActions,
  AvatarAdditionalActions,
  AvatarImportActions,
  AvatarConnectionsActions,
  AvatarExportActions
} from './actions';
import { initialState, State } from './avatar.state';
import { Avatar, AvatarConnection, AvatarListQueryModel, AvatarDetails, AvatarCity, AvatarProxy } from '../models/avatar.model';
import { AvatarStatus, AvatarConnectionStatus, SocialNetworks, GOOGLE_SN_LINK_DEFAULT_NAME } from '../avatar.enums';
import { InjectionToken } from '@angular/core';
import { SseCrawlingErrors } from '@app/shared/shared.enums';
import { AvatarExportSummaryNormalized } from '../models/avatar-override-diff.model';


export function avatars (
  state = initialState.avatars,
  action: AvatarListActions.Actions
): Avatar[] {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case AvatarListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.avatars;
    }
    default: {
      return state;
    }
  }
}

export function avatarsTotal (
  state = initialState.avatarsTotal,
  action: AvatarListActions.Actions
): number {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_REQUEST:
    case AvatarListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case AvatarListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemsCount;
    }
    default: {
      return state;
    }
  }
}

export function listQuery (
  state = initialState.listQuery,
  action: AvatarListActions.Actions
): AvatarListQueryModel {
  switch (action.type) {
    case AvatarListActions.ActionTypes.CHANGE_FILTER:
    case AvatarListActions.ActionTypes.CHANGE_PAGINATION:
    case AvatarListActions.ActionTypes.CHANGE_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }
    case AvatarListActions.ActionTypes.CLEAR_LIST_QUERY: {
      return initialState.listQuery;
    }
    default: {
      return state;
    }
  }
}

export function isLoading (
  state = initialState.isLoading,
  action: AvatarListActions.Actions | AvatarCrudActions.Actions | AvatarConnectionsActions.Actions
): boolean {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_REQUEST:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST: {
      return true;
    }
    case AvatarListActions.ActionTypes.LOAD_FAILURE:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE:
    case AvatarListActions.ActionTypes.LOAD_SUCCESS:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function error (
  state = initialState.isLoading,
  action: AvatarListActions.Actions | AvatarCrudActions.Actions | AvatarAdditionalActions.Actions
): any {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_REQUEST:
    case AvatarListActions.ActionTypes.LOAD_SUCCESS:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return null;
    }
    case AvatarListActions.ActionTypes.LOAD_FAILURE:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return action.payload.error;
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.isLoading;
    }
    default: {
      return state;
    }
  }
}

export function selected (
  state = initialState.selected,
  action: AvatarCrudActions.Actions | AvatarAdditionalActions.Actions
): any {
  switch (action.type) {
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST: {
      return {
        id: action.payload.id
      };
    }
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      const { firstName, lastName, middleName } = action.payload;
      return {
        id: state.id,
        name: `${lastName} ${firstName} ${middleName || ''}`,
        type: action.payload.type
      };
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.selected;
    }
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE:
    default: {
      return state;
    }
  }
}

export function selectedDetails (
  state = initialState.selectedDetails,
  action: AvatarCrudActions.Actions | AvatarImportActions.Actions | AvatarAdditionalActions.Actions | AvatarExportActions.Actions
): AvatarDetails {
  switch (action.type) {
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return state;
    }
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return {
        ...action.payload,
        // state: AvatarStatus.EXPORT // MOCK!
      };
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.selectedDetails;
    }
    /**
     * Temporarry. Remove when BE add a parameter to avatar details
     */
    case AvatarImportActions.ActionTypes.IMPORT_START_FAILURE:
    case AvatarImportActions.ActionTypes.IMPORT_COMPLETE_FAILURE:
    case AvatarExportActions.ActionTypes.EXPORT_START_FAILURE:
    case AvatarExportActions.ActionTypes.EXPORT_COMPLETE_FAILURE: {
      return state
        ? {
          ...state,
          state: AvatarStatus.AVAILABLE
        }
        : state;
    }
    /**
     * Set properly avatar.state when Import starts according to Social Network
     */
    case AvatarImportActions.ActionTypes.IMPORT_START_REQUEST: {
      const avatarState = `${action.payload.sn}_IMPORT`;
      return state
        ? {
          ...state,
          state: AvatarStatus[avatarState] || AvatarStatus.AVAILABLE
        }
        : state;
    }
    /**
     * Set properly avatar.state when Export starts
     */
    case AvatarExportActions.ActionTypes.EXPORT_START_SUCCESS: {
      return state
        ? {
          ...state,
          state: AvatarStatus.EXPORT
        }
        : state;
    }
    /**
     * Set properly avatar.state on show Export preview table
     */
    case AvatarExportActions.ActionTypes.EXPORT_PREVIEW: {
      return state
        ? {
          ...state,
          state: AvatarStatus.EXPORT_PREVIEW
        }
        : state;
    }
    /**
     * Cancel avatar status (state)
     * Review avatar export summary
     */
    case AvatarImportActions.ActionTypes.CANCEL_IMPORT_DIFF_SUCCESS:
    case AvatarExportActions.ActionTypes.REVIEW_EXPORT_SUMMARY_SUCCESS:
    case AvatarExportActions.ActionTypes.EXPORT_DISCARD: {
      return state
        ? {
          ...state,
          state: AvatarStatus.AVAILABLE
        }
        : state;
    }
    /**
    * Get valid current avatar state
    */
    case AvatarAdditionalActions.ActionTypes.GET_CURRENT_STATE_SUCCESS: {
     return state
       ? {
         ...state,
         ...action.payload,
        //  state: AvatarStatus.EXPORT_REVIEW // MOCK!
       }
       : state;
    }
    default: {
      return state;
    }
  }
}

export function selectedLog (
  state = initialState.selectedLog,
  action: AvatarCrudActions.Actions | AvatarImportActions.Actions | AvatarAdditionalActions.Actions
): any[] {
  switch (action.type) {
    case AvatarImportActions.ActionTypes.LOAD_ACTIVITY_LOG_SUCCESS: {
      return action.payload
        .map(item => ({
            createdAt: item.createdAt,
            error: item.error,
            messageType: item.entryType + '_' + item.snType
          })
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);
    }
    case AvatarImportActions.ActionTypes.LOAD_ACTIVITY_LOG_REQUEST: {
      return [];
    }
    case AvatarImportActions.ActionTypes.IMPORT_COMPLETE_FAILURE:
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return initialState.selectedLog;
    }
    default: {
      return state;
    }
  }
}

export function connections (
  state = initialState.connections,
  action: AvatarConnectionsActions.Actions | AvatarAdditionalActions.Actions | AvatarImportActions.Actions | AvatarExportActions.Actions
): object {
  switch (action.type) {
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE: {
      return state;
    }
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      /**
       * Serialize connections array to object
       */
      return action.payload.connections.reduce((res, item: AvatarConnection) => {
        res[item.type] = {
          ...item,
          avatarId: action.payload.avatarId,
          enabled: item.state === AvatarConnectionStatus.LINKED,
          isLoading: item.state === AvatarConnectionStatus.IS_LOADING
        };
        res[item.type].firstName = item.type !== SocialNetworks.GOOGLE ? res[item.type].firstName : GOOGLE_SN_LINK_DEFAULT_NAME;
        return res;
      }, {});
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_START_REQUEST: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          ...action.payload.connection,
          enabled: current.enabled,
          isLoading: true
        }
      };
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_START_SUCCESS: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          enabled: action.payload.connection.state === AvatarConnectionStatus.LINKED,
          state: action.payload.connection.state || AvatarConnectionStatus.NOT_LINKED,
          isLoading: action.payload.connection.state === AvatarConnectionStatus.IS_LOADING
        }
      };
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_WRONG_CREDENTIALS: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          state: action.payload.connection.state || AvatarConnectionStatus.NOT_LINKED,
          isLoading: action.payload.connection.state === AvatarConnectionStatus.IS_LOADING
        }
      };
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_COMPLETE_SUCCESS: {
      const current = state[action.payload.snType] || {};
      return current.avatarId === action.payload.avatarId ? {
        ...state,
        [action.payload.snType]: {
          ...current,
          state: AvatarConnectionStatus.LINKED,
          enabled: true,
          isLoading: false
        }
      } : state;
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_START_FAILURE:
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_COMPLETE_FAILURE: {
      const current = state[action.payload.snType] || {};
      return current.avatarId === action.payload.avatarId ? {
        ...state,
        [action.payload.snType]: {
          ...current,
          isLoading: false
        }
      } : state;
    }
    // case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_REQUEST: {
    //   const current = state[action.payload.connectionId] || {};
    //   return {
    //     ...state,
    //     [action.payload.connectionId]: {
    //       ...current,
    //       ...action.payload.connection,
    //       enabled: current.enabled,
    //       isLoading: true
    //     }
    //   };
    // }
    // case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_SUCCESS: {
    //   const current = state[action.payload.connectionId] || {};
    //   return {
    //     ...state,
    //     [action.payload.connectionId]: {
    //       ...current,
    //       ...action.payload.connection,
    //       isLoading: false
    //     }
    //   };
    // }
    // case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTION_WRONG_CREDENTIALS: {
    //   const current = state[action.payload.connectionId] || {};
    //   return {
    //     ...state,
    //     [action.payload.connectionId]: {
    //       ...current,
    //       ...action.payload.connection,
    //       enabled: current.enabled,
    //       isLoading: false
    //     }
    //   };
    // }
    // case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_FAILURE: {
    //   const current = state[action.payload.connectionId] || {};
    //   return {
    //     ...state,
    //     [action.payload.connectionId]: {
    //       ...current,
    //       isLoading: false
    //     }
    //   };
    // }
    case AvatarImportActions.ActionTypes.IMPORT_COMPLETE_FAILURE:
    case AvatarExportActions.ActionTypes.EXPORT_COMPLETE_FAILURE: {
      const current = state[action.payload.snType] || {};
      return action.payload.error === SseCrawlingErrors.INVALID_CREDENTIALS
        ? {
          ...state,
          [action.payload.snType]: {
            ...state[action.payload.snType],
            enabled: false
          }
        }
        : state;
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.connections;
    }
    default: {
      return state;
    }
  }
}

export function proxies (
  state = initialState.proxies,
  action: AvatarConnectionsActions.Actions
): AvatarProxy[] {
  switch (action.type) {
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE: {
      return state;
    }
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      return action.payload.proxies;
    }
    default: {
      return state;
    }
  }
}

export function currentTab (
  state = initialState.currentTab,
  action: AvatarAdditionalActions.Actions
): number {
  switch (action.type) {
    case AvatarAdditionalActions.ActionTypes.CHANGE_TAB: {
      return action.payload.tabIndex;
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.currentTab;
    }
    default: {
      return state;
    }
  }
}

export function isCreateBtnDisabled (
  state = initialState.isCreateBtnDisabled,
  action: AvatarCrudActions.Actions
): boolean {
  switch (action.type) {
    case AvatarCrudActions.ActionTypes.CREATE_NEW_REQUEST: {
      return true;
    }
    case AvatarCrudActions.ActionTypes.CREATE_NEW_SUCCESS:
    case AvatarCrudActions.ActionTypes.CREATE_NEW_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function cities (
  state = initialState.cities,
  action: AvatarAdditionalActions.Actions
): AvatarCity[] {
  switch (action.type) {
    case AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_FAILURE: {
      return state;
    }
    case AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_SUCCESS: {
      return action.payload;
    }
    case AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_REQUEST:
    case AvatarAdditionalActions.ActionTypes.CLEAR_CITIES: {
      return initialState.cities;
    }
    default: {
      return state;
    }
  }
}

export function importDiffs (
  state = initialState.importDiffs,
  action: AvatarImportActions.Actions | AvatarAdditionalActions.Actions
): any {
  switch (action.type) {
    case AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload.diff
      };
    }
    case AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_REQUEST:
    case AvatarImportActions.ActionTypes.CANCEL_IMPORT_DIFF_SUCCESS:
    case AvatarImportActions.ActionTypes.CONFIRM_IMPORT_DIFF_SUCCESS:
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.importDiffs;
    }
    case AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_FAILURE: {
      return {
        ...state,
        [action.payload.id]: {
          error: true
        }
      };
    }
    default: {
      return state;
    }
  }
}

export function exportSummaries (
  state = initialState.exportSummaries,
  action: AvatarExportActions.Actions | AvatarAdditionalActions.Actions
): AvatarExportSummaryNormalized {
  switch (action.type) {
    case AvatarExportActions.ActionTypes.LOAD_EXPORT_SUMMARY_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: {
          ids: action.payload.summary.map(item => item.type),
          fields: action.payload.summary[0] ? action.payload.summary[0].fields.map(item => item.name) : [],
          summaryList: action.payload.summary.reduce((res, item) => {
            res[item.type] = item;
            return res;
          }, {})
        }
      };
    }
    case AvatarExportActions.ActionTypes.REVIEW_EXPORT_SUMMARY_REQUEST: {
      return {
        ...state,
        [action.payload.id]: null
      };
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.exportSummaries;
    }
    case AvatarExportActions.ActionTypes.LOAD_EXPORT_SUMMARY_FAILURE:
    case AvatarExportActions.ActionTypes.REVIEW_EXPORT_SUMMARY_FAILURE:
    default: {
      return state;
    }
  }
}

export function awaitImportConfirmation (
  state = initialState.awaitImportConfirmation,
  action: AvatarImportActions.Actions | AvatarAdditionalActions.Actions | AvatarExportActions.Actions
): number[] {
  switch (action.type) {
    /**
     * Add avatar id to 'await array' when import of this avatar was finished
     */
    case AvatarImportActions.ActionTypes.IMPORT_COMPLETE_SUCCESS:
    case AvatarExportActions.ActionTypes.EXPORT_COMPLETE_SUCCESS:
    case AvatarExportActions.ActionTypes.EXPORT_COMPLETE_FAILURE: {
      const newData = [
        ...state,
        action.payload.avatarId
      ];
      return Array.from(new Set(newData)); // Use `Set` to get only unique values
    }
    /**
     * Remove avatar id from 'await array' if Avatar Details of this avatar was requested
     */
    case AvatarAdditionalActions.ActionTypes.GET_CURRENT_STATE_REQUEST: {
      const index = state.indexOf(action.payload.id);
      return index !== -1 ? state.slice(index, -1) : state;
    }
    default: {
      return state;
    }
  }
}

// Combine reducers
// Add token for 'production' mode
export const reducers = combineReducers({
  avatars,
  avatarsTotal,
  listQuery,
  isLoading,
  error,
  selected,
  selectedDetails,
  selectedLog,
  connections,
  proxies,
  currentTab,
  isCreateBtnDisabled,
  cities,
  importDiffs,
  exportSummaries,
  awaitImportConfirmation
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('AvatarReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const getAvatars = (state: State): Avatar[] => state.avatars;
export const getSelected = (state: State): any => state.selected;
export const getSelectedDetails = (state: State): AvatarDetails => state.selectedDetails;
export const getCurrentTab = (state: State): number => state.currentTab;
export const getConnections = (state: State): object => state.connections;
export const getProxies = (state: State): AvatarProxy[] => state.proxies;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getAvatarsTotal = (state: State): number => state.avatarsTotal;
export const getListQuery = (state: State): AvatarListQueryModel => state.listQuery;
export const getSortBy = (state: State): object => state.listQuery.sortBy;
export const getIsCreateBtnDisabled = (state: State): boolean => state.isCreateBtnDisabled;
export const getCities = (state: State): AvatarCity[] => state.cities;
export const getImportDiffs = (state: State): any => state.importDiffs;
export const getExportSummaries = (state: State): any => state.exportSummaries;
export const getAwaitImportConfirmation = (state: State): any => state.awaitImportConfirmation;
export const getAvatarLog = (state: State): any => state.selectedLog;

export const getStatus = (state: State): AvatarStatus =>
  state.selectedDetails
  ? state.selectedDetails.state
  : AvatarStatus.AVAILABLE;

export const isImport = (state: State): boolean =>
  state.selectedDetails
  ? state.selectedDetails.state === AvatarStatus.FACEBOOK_IMPORT
    || state.selectedDetails.state === AvatarStatus.ODNOKLASSNIKI_IMPORT
  : false;

export const isAwaitImportConfirmation = (state: State): boolean =>
  state.selectedDetails
  ? state.selectedDetails.state === AvatarStatus.FB_IMPORT_CONFIRMATION
    || state.selectedDetails.state === AvatarStatus.OK_IMPORT_CONFIRMATION
  : false;

export const isExport = (state: State): boolean =>
  state.selectedDetails
  ? state.selectedDetails.state === AvatarStatus.EXPORT
  : false;

export const isAwaitExportReview = (state: State): boolean =>
  state.selectedDetails
  ? state.selectedDetails.state === AvatarStatus.EXPORT_REVIEW
  : false;

export const isImportExportEnabled = (state: State): boolean =>
  state.selectedDetails
  ? state.selectedDetails.state === AvatarStatus.AVAILABLE
  : true;
