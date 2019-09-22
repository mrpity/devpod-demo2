import { AvatarStatus, AvatarConnectionStatus } from '../avatar.enums';

export interface Avatar {
  id: number;
  createdAt: Date;
  name: string;
  modifiedAt: Date;
  profilePicBase64: string | null;
  type: string;
  connections: any;
}

export interface AvatarListModel {
  avatars: Avatar[];
  totalItemsCount: number;
}


interface AvatarSortByModel {
  field: string;
  asc: boolean;
}

export interface AvatarListQueryModel {
  pageNumber: number;
  pageSize: number;
  sortBy: AvatarSortByModel;
  filter: Partial<AvatarFiltersModel>;
}

export interface AvatarFiltersModel {
  createdAtFrom: Date;
  createdAtTo:  Date;
  modifiedAtFrom:  Date;
  modifiedAtTo:  Date;
  searchInName: string;
  types: string[];
  snType: string[];
}

export interface AvatarConnection {
  enabled: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
  profilePicBase64: string;
  login: string;
  password: string;
  phone: string;
  type: string;
  state: AvatarConnectionStatus;
  isLoading?: boolean;
}

export interface AvatarProxy {
  country: string;
  countryCode: string;
  cities: string[];
}

export interface AvatarConnectionSetupResponse {
  errorMessage: string | null;
  errorType: string | null;
  state: AvatarConnectionStatus;
  success: boolean;
}

export interface AvatarCity {
  city?: string;
  country?: string;
}

export interface AvatarDetails {
  bio: string;
  birthDate;
  createdAt;
  emails: string[];
  favoriteBooks: string;
  favoriteMovies: string;
  favoriteMusic: string;
  favoriteTvShows: string;
  favoriteSports: string;
  favoriteAppsAndGames: string;
  firstName: string;
  fromLocation: AvatarCity;
  gender: string;
  languages: string[];
  lastName: string;
  livesInLocation: AvatarCity;
  maritalStatus: string;
  middleName: string;
  modifiedAt: any;
  // occupations: string[]; // DEPRECATED!
  phones: string[];
  politicalViews: string;
  professionalSkills: string;
  profilePicBase64: string;
  profilePicName: string;
  religiousViews: string;
  socialLinks: string[];
  type: string;
  websites: string[];
  educations: any;
  state: AvatarStatus;
}

export interface AvatarLang {
  id: string;
  text: string;
}

export interface AvatarGQLResponce {
  data: {
    setupAvatarConnection?,
    importAvatarProfile?,
    confirmAvatarImport?,
    declineAvatarImport?,
    exportAvatarProfile?
  };
}
