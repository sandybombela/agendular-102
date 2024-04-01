import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Daily, NewDaily } from '../models/classes/daily';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailiesService {

  private endpointURL = `${environment.apiHost}/dailies`;

  // BehaviorSubject guarda un estado inicial y permite consultar el último valor emitido
  private dailies = new BehaviorSubject<Daily[]>([]);

  // Observable público para suscribirse
  dailies$ = this.dailies.asObservable();

  constructor(private http: HttpClient) { }

  // Métodos HTTP con API

  // Método GET
  getDailies() {
    return this.http.get<Daily[]>(this.endpointURL);
  }

  // Método POST
  postDaily(daily: NewDaily) {

    /**
     * Operador pipe & tap de rxjs
     *
     * pipe: Encadena operadores de rxjs
     * tap: Permite ejecutar una función en cada emisión, sin alterar los datos
     */
    return this.http.post<Daily>(this.endpointURL, daily)
      .pipe(
        tap((newDaily: Daily) => {
          const currentDailies = this.dailies.getValue();
          currentDailies.unshift(newDaily);
          this.dailies.next(currentDailies);
        })
      );
  }

  // Método del Observable
  setDailies(dailies: Daily[]) {
    this.dailies.next(dailies);
  }
}
