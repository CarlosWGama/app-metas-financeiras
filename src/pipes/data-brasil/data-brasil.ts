import { Pipe, PipeTransform } from '@angular/core';

/**
 * @author Carlos W. Gama
 */
@Pipe({
  name: 'dataBrasil',
})
export class DataBrasilPipe implements PipeTransform {
  
  transform(value: string, ...args) {
    if (value != '' && value != undefined) {
      let data = value.split('-');
      return data[2]+'/'+data[1]+'/'+data[0];
    }
    return value;
  }
}
