import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFrame'
})
export class TimeFramePipe implements PipeTransform {

  transform(input: any): any {
    if (typeof input !== 'number') {
      return input;
    }
    function twoDigits(value) {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    }
    const date = new Date(input);
    const days = date.getUTCDate();
    const hours = (24 * (days - 1)) + date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${twoDigits(hours)} : ${twoDigits(minutes)}`;
  }

}
