import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(date: any, args?: any): any {
    return `${moment().diff(date, 'years')} años (${moment(date).format('dddd DD/MMMM/YYYY')})`;
  }

}
