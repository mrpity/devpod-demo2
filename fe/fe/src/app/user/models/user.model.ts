export interface User {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  createdAt: Date;
  modifiedAt: Date;
  role: string;
  email: string;
}

export interface UserList {
  items: Partial<User[]>;
  totalItemsCount: number;
}

export interface UserSortByModel {
  field: string;
  asc: boolean;
}

export interface UserListQueryModel {
  pageNumber: number;
  pageSize: number;
  sortBy: UserSortByModel;
}

export enum FormMode {
  ADD = 'ADD',
  EDIT = 'EDIT'
}
