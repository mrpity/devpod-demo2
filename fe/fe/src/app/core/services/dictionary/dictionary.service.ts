import { Injectable } from '@angular/core';
import { languages } from '@app/core/services/dictionary/dictionaries/languages';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor() { }

  getLanguages() {
    return languages;
  }

  // DEPRECATED!
  getLanguageName(id) {
    return {
      id: id,
      text: languages[id]
    };
  }

  // DEPRECATED!
  getSelectedLanguageName(id) {
    return languages[id] ? languages[id] : '' ;
  }
}
