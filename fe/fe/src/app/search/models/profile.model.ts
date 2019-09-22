export interface ProfileOutput {
  index: string;
  type: string;
  crawlingDate: string;
  documentId: string;
  profileUrl: string;
  profileId: string;
  profileAlias: string;
  profilePhotoPath: string;
  firstName: string;
  middleName: string;
  lastName: string;
  joinedFacebook: string;
  birthDate: string;
  gender: string;
  languages: string[];
  bio: string;
  websites: string[];
  socialLinks: string[];
  phones: string[];
  email: string[];
  maritalStatus: string[];
  politicalViews: string[];
  religiousViews: string[];
  familyMembers: string[];
  favoriteAnimals: string[];
  favoriteCarsAndMotorcycles: string[];
  favoriteBooks: string[];
  favoriteFoods: string[];
  favoriteGames: string[];
  favoriteMovies: string[];
  favoriteMusic: string[];
  favoriteSports: string[];
  favoriteTvShows: string;
  favoriteHealthAndBeauty: string[];
  favoriteSciences: string[];
  favoriteTravelsAndTourism: string[];
  otherInterests: string[];
  occupations: string[];
  armyList: string[];
  educations: string[];
  professionalSkills: string;
  livesInLocations: string[];
  fromLocations: string[];
  profilePicBase64: string;
  friends: FriendListItem[];
}

export interface FriendListItem {
  name: string;
  url: string;
}

export interface ProfileDetailsParams {
  index: string;
  documentId: string;
  tabs: string;
}
