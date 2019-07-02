import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Data } from '../data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'SortedDataBase'
	url = 'https://api-foodful.herokuapp.com/v1/sorted';
  data: Data[];
	cowID = [];
	Pen_Number = [];
	Milk_Produced = [];
	Feed_Consumed = [];
	Rest_Time = [];
	Drinking_Water_Time = [];
	chart = [];
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: Data[]) => {
      res.data.recordset.forEach(y => {
      this.cowID.push(y.cowID);
      this.Pen_Number.push(y.Pen_Number);
      this.Milk_Produced.push(y.Milk_Produced);
      this.Feed_Consumed.push(y.Feed_Consumed);
      this.Rest_Time.push(y.Rest_Time);
      this.Drinking_Water_Time.push(y.Drinking_Water_Time);
      });
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.cowID,
          datasets: [{
            data: this.Milk_Produced,
            borderColor: '#8cba9f',
            fill: false
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
}
}
