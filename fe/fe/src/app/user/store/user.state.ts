import { User, UserListQueryModel } from '../models/user.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface UserEntityState extends EntityState<User> { }

export interface State {
  totalUsersCount: number;
  selectedUserId: number;
  users: UserEntityState;
  currentUsersIds: number[];
  listQuery: UserListQueryModel;
  isLoading: boolean;
  error: any;
}

export const adapterUser = createEntityAdapter<User>({});

export const initialState: State = {
  users: adapterUser.getInitialState(),
  currentUsersIds: [],
  selectedUserId: 0,
  totalUsersCount: 0,
  listQuery: {
    pageNumber: 0,
    pageSize: 20,
    sortBy: {
      field: 'modifiedAt',
      asc: false
    }
  },
  isLoading: false,
  error: null,
};
