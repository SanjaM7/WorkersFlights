import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      throw new Error('Invalid duration value');
    }

    let hours: number;
    let minutes: number;

    hours   = Math.floor(((value / 60) / 60));
    minutes = Math.floor(((value / 60) % 60));

    return this.format(hours, minutes);
  }

  private format(hours: number, minutes: number): string {
    if (hours === 0){
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  }

}
