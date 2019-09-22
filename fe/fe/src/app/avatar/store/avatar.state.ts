import { Avatar, AvatarDetails, AvatarListQueryModel, AvatarCity, AvatarProxy } from '../models/avatar.model';

export interface State {
  avatars: Avatar[];
  avatarsTotal: number;
  listQuery: AvatarListQueryModel;
  selected: any;
  selectedDetails: AvatarDetails;
  selectedLog: any[];
  connections: object;
  proxies: AvatarProxy[];
  currentTab: number;
  isLoading: boolean;
  error: any;
  isCreateBtnDisabled: boolean;
  cities: AvatarCity[];
  importDiffs: any;
  exportSummaries: any;
  awaitImportConfirmation: number[];
}

export const initialState: State = {
  avatars: [],
  avatarsTotal: 0,
  listQuery: {
    pageNumber: 0,
    pageSize: 20,
    filter: {},
    sortBy: {
      field: 'modifiedAt',
      asc: false
    }
  },
  selected: undefined,
  selectedDetails: undefined,
  selectedLog: undefined,
  connections: {},
  proxies: undefined,
  currentTab: 0,
  isLoading: false,
  error: null,
  isCreateBtnDisabled: false,
  cities: [],
  importDiffs: {},
  exportSummaries: {},
  awaitImportConfirmation: []
};
