import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumen'
})
export class ResumenPipe implements PipeTransform {

  // Custom Pipe para elaborar un resumen a partir de la descripcion del film
  // Se capitaliza todo pero de ponen en minusculas ciertas preposiciones
  // para facilitar y resaltar la lectura en las cards

  transform(value: string, args?: any) {
    if (!value) {
      // console.log('nulo');
      return null;
    }
    const prep = ['a', 'de', 'en', 'un', 'una', 'por', 'para'];
    const splitted = value.split(' ');

    for (let i = 0; i < splitted.length; i++) {
      if (i > 0 && prep.includes(splitted[i].toLowerCase())) {
        splitted[i] = splitted[i].toLowerCase();
      } else {
        splitted[i] = splitted[i].substring(0, 1).toUpperCase() + splitted[i].substring(1).toLowerCase();
      }
    }
    // console.log(value);
    return splitted.join(' ').slice(0, 40) + ' ...';
    // return value;
  }
}

