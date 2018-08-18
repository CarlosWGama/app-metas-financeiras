import { Pipe, PipeTransform } from '@angular/core';

/**
 * @author Carlos W. Gama
 * @since 0.1.1
 */
@Pipe({
  name: 'dinheiro',
})
export class DinheiroPipe implements PipeTransform {
  
  transform(value: string, ...args) {
    return Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

    //return this.format(value, 2, ',', '.');
  }

  /**
   * 
   * @param n Valor
   * @param c Casas decimais
   * @param d Separador de casas decimais
   * @param t Separador de milhar
   */
  /*private format(n, c, d, t){
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };*/
}
