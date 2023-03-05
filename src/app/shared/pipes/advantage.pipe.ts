import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'advantage'
})
export class AdvantagePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 150) {
      return value.substr(0,150) + '...';
    } else {
      return value;
    }
  }

}
