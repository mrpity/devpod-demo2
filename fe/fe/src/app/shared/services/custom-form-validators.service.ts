
import { FormControl } from '@angular/forms';

export class CustomFormValidators {

  static validatePhone(control: FormControl) {
    const MIN_LENGTH = /^[+]{0,1}[0-9]{11,}$/; // By min length
    const MAX_LENGTH = /^[+]{0,1}[0-9]{0,13}$/; // By max length
    const PATTERN = /^[+]{0,1}[0-9]+$/; // By pattern characters

    if (!control.value) { return null; }

    if (!PATTERN.test(control.value)) {
      return {
        pattern: { valid: false }
      };
    }

    if (!MIN_LENGTH.test(control.value)) {
      return {
        minlength: { valid: false }
      };
    }

    if (!MAX_LENGTH.test(control.value)) {
      return {
        maxlength: { valid: false }
      };
    }

    return null;
  }

  static validateUrl(control: FormControl) {
    const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return !control.value || regexp.test(control.value)
    ? null
    : {
      pattern: { valid: false }
    };
  }

  static validateEmail(control: FormControl) {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !control.value || regexp.test(control.value)
    ? null
    : {
      pattern: { valid: false }
    };
  }

  static validateName(control: FormControl) {
    const regexp = /^[а-яА-ЯёЁa-zA-Z0-9 '"`-]*$/;
    return !control.value || regexp.test(control.value)
    ? null
    : {
      pattern: { valid: false }
    };
  }

}
