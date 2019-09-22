import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'safe'})
export class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
