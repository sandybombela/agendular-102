import { Injectable } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  // Observable
  // * Versión EventEmitter con más alcance
  // Permiten emisión de valores que van ocurriendo con el tiempo,
  // otros componentes pueden suscribirse
  private clock$: Observable<Date>;

  // interval rxjs es una función que crea un observable que emite datos en intervalos regulares
  constructor() {
    // map
    // Transformador de cada valor emitido
    this.clock$ = interval(1000).pipe(
      // map(() => new Date())
      map((intervalValue) => {
        console.log(intervalValue)
        return new Date();
      })
    );
  }
  getClock(): Observable<Date> {
    return this.clock$;
  }

}
