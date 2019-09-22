import { Injectable } from '@angular/core';

interface WarningDescription {
  warning: boolean;
  msg: string;
}
interface FieldWarnings {
  all: WarningDescription;
  facebook: WarningDescription;
  odnoklassniki: WarningDescription;
}

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor() { }

  getFieldDescription (fieldName: string, selectedSN: string[]) {
    const warningsList: WarningDescription[] = [];
    const fieldObj: FieldWarnings = exportFieldDescriptions[fieldName];
    let name: string;
    if (!!fieldObj.all) {
      warningsList.push(fieldObj.all);
    }

    selectedSN.forEach((snName: string) => {
      name = snName.toLowerCase();
      if (!!fieldObj[name]) {
        warningsList.push(fieldObj[name]);
      }
    });
    return warningsList;
  }

  checkFieldExistence(snName: string, fieldName: string ) {
    return availableFields[snName].indexOf(fieldName);
  }
}

const exportFieldDescriptions = {
  bio: {
    all: null,
    facebook: {
      warning: false,
      msg: 'Facebook only supports 101 symbols'
    },
    odnoklassniki: null,
  },
  birthDate: {
    all: null,
    facebook: {
      warning: true,
      msg: 'In Facebook you can only change the birthday a limited number of times and age can be over 18'
    },
    odnoklassniki: null,
  },
  emails: {
    all: null,
    facebook: {
      warning: true,
      msg: 'In Facebook you can\'t export emails'
    },
    odnoklassniki: null,
  },
  favoriteAppsAndGames: {
    all: null,
    facebook: {
      warning: true,
      msg: 'This field is currently not working on Facebook'
    },
    odnoklassniki: null,
  },
  favoriteBooks: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  favoriteMovies: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  favoriteMusic: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  favoriteSports: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  favoriteTvShows: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  firstName: {
    all: null,
    facebook: {
      warning: true,
      msg: 'In Facebook you can change the name only once in 2 months'
    },
    odnoklassniki: null,
  },
  fromLocation: {
    all: {
      warning: false,
      msg: 'Only supports predefined value'
    },
    facebook: null,
    odnoklassniki: null,
  },
  gender: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  languages: {
    all: null,
    facebook: {
      warning: false,
      msg: 'Facebook only supports predefined values'
    },
    odnoklassniki: null,
  },
  lastName: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  livesInLocation: {
    all: {
      warning: false,
      msg: 'Only supports predefined value'
    },
    facebook: null,
    odnoklassniki: null,
  },
  maritalStatus: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  middleName: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  // occupations: { // DEPRECATED!
  //   all: null,
  //   facebook: null,
  //   odnoklassniki: null,
  // },
  phones: {
    all: null,
    facebook: {
      warning: true,
      msg: 'In Facebook you can\'t export phones'
    },
    odnoklassniki: null,
  },
  politicalViews: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  profilePicBase64: {
    all: {
      warning: false,
      msg: 'Image is cropped automatically',
    },
    facebook: null,
    odnoklassniki: null,
  },
  religiousViews: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  socialLinks: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  websites: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  },
  educations: {
    all: null,
    facebook: null,
    odnoklassniki: null,
  }
};

// MOCK! should be changed by real data
const availableFields = {
  facebook: [
    'bio',
    'birthDate',
    'emails',
    'favoriteAppsAndGames',
    'favoriteBooks',
    'favoriteMovies',
    'favoriteMusic',
    'favoriteSports',
    'favoriteTvShows',
    'firstName',
    'fromLocation',
    'gender',
    'languages',
    'lastName',
    'livesInLocation',
    'maritalStatus',
    'middleName',
    // 'occupations', // DEPRECATED!
    'phones',
    'politicalViews',
    'profilePicBase64',
    'religiousViews',
    'socialLinks',
    'websites',
    'educations'
  ],
  odnoklassniki: [
    'bio',
    'birthDate',
    'emails',
    'favoriteAppsAndGames',
    'favoriteBooks',
    'favoriteMovies',
    'favoriteMusic',
    'favoriteSports',
    'favoriteTvShows',
    'firstName',
    'fromLocation',
    'gender',
    'languages',
    'lastName',
    'livesInLocation',
    'maritalStatus',
    'middleName',
    // 'occupations', // DEPRECATED!
    'phones',
    'politicalViews',
    'profilePicBase64',
    'religiousViews',
    'socialLinks',
    'websites',
    'educations'
  ]
};
