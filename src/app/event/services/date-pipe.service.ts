import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class CustomDatePipeService {

 constructor() { }

 transform(value: any, format: string = 'dd-MM-yyyy'): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString(); 

    day = day.length < 2 ? '0' + day : day;
    month = month.length < 2 ? '0' + month : month;

    return `${day}-${month}-${year}`;
 }
}

