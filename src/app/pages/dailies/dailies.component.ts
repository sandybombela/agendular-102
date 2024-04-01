import { Component, OnInit } from '@angular/core';
import { Daily } from 'src/app/models/classes/daily';
import { DailiesService } from 'src/app/services/dailies.service';

@Component({
  selector: 'app-dailies',
  templateUrl: './dailies.component.html',
  styleUrls: ['./dailies.component.css']
})
export class DailiesComponent implements OnInit {

  myDailies: Daily[] = [];

  constructor(private dailiesService: DailiesService) { }

  ngOnInit(): void {
    this.dailiesService.getDailies()
      .subscribe({
        next: (data) => {
          this.dailiesService.setDailies(data);
        },
        error: (error) => {
          console.error(error);
          alert('No se pudo cargar la información del servidor');
        }
      });

    this.dailiesService.dailies$.subscribe((dailies) => {
      console.log(dailies);
      this.myDailies = dailies;
    });
  }

  handlerDailyEmitted(daily: Daily): void {
    this.myDailies.push(daily);
  }
}
