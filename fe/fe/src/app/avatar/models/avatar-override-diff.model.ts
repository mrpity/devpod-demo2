import { AvatarCity } from '@app/avatar/models/avatar.model';

export interface AvatarDiff {
  bio: DiffString;
  birthDate;
  emails: DiffList[];
  favoriteBooks: DiffString;
  favoriteMovies: DiffString;
  favoriteMusic: DiffString;
  favoriteTvShows: DiffString;
  firstName: DiffString;
  fromLocation: DiffAvatarCity;
  gender: DiffString;
  languages: DiffList[];
  lastName: DiffString;
  livesInLocation: DiffAvatarCity;
  maritalStatus: DiffString;
  middleName: DiffString;
  // occupations: DiffList[]; // DEPRECATED!
  phones: DiffList[];
  politicalViews: DiffString;
  profilePicBase64: DiffString;
  religiousViews: DiffString;
  socialLinks: DiffList[];
  websites: DiffList[];
  favoriteSports: DiffString;
  favoriteAppsAndGames: DiffString;
  error?: any;
}

export interface DiffString {
  current: string;
  erroneous: string;
  imported: string;
}

export interface DiffList {
  current: string[];
  erroneous: string;
  imported: string[];
}

export interface DiffAvatarCity {
  current: AvatarCity;
  erroneous: string;
  imported: AvatarCity;
}

export interface ExportField {
  name: string;
  error: string;
}

export interface AvatarExportSummary {
  type: string;
  error: string;
  fields: ExportField[];
}

export interface AvatarExportSummaryList {
  FACEBOOK: AvatarExportSummary;
  ODNOKLASSNIKI: AvatarExportSummary;
}

export interface AvatarExportSummaryNormalized {
  [x: number]: {
    ids: string[];
    summaryList: AvatarExportSummaryList;
  };
}
