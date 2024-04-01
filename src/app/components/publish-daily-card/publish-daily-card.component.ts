import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Daily, NewDaily } from 'src/app/models/classes/daily';
import { ClockService } from 'src/app/services/clock.service';
import { DailiesService } from 'src/app/services/dailies.service';
import { emotionsSeed } from 'src/utils/seed';

@Component({
  selector: 'app-publish-daily-card',
  templateUrl: './publish-daily-card.component.html',
  styleUrl: './publish-daily-card.component.css'
})

export class PublishDailyCardComponent implements OnInit {
  @Output('nuevoDaily') dailyEmitter = new EventEmitter<Daily>()

  clockNow: Date = new Date()
  todayDaily: NewDaily = new NewDaily()
  emotionsCatalog: string[] = emotionsSeed

  constructor(
    private clockService: ClockService,
    private dailiesService: DailiesService
  ) {

  }

  ngOnInit(): void {
    this.clockService.getClock().subscribe((clockNow) => {
      this.clockNow = clockNow
    })
  }

  publishDaily() {
    // this.dailyEmitter.emit(this.todayDaily)
     //this.http://localhost:3000s.todayDaily = new Daily()

    this.dailiesService.postDaily(this.todayDaily)
      .subscribe(
        {
          next: (data) => {
            // Manejo de Respuesta (Satisfactoria)
            console.log('data', data)

          },
          error: (error) => {
            // Manejo de Errores
            console.log('error', error)
            alert('Intenta de nuevo')
          }
        }
      )
  }
}
