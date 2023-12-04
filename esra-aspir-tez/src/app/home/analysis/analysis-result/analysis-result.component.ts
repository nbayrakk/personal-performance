import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { DataService } from './../../../service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {
  performans: any;
  chart: any;
  chart2: any;
  weeks: any = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    let sw = this.dataService.getData().selectedStartWeek;
    let ew = this.dataService.getData().selectedEndWeek;
    if(!sw || !ew){
        this.router.navigate(['/analiysis-select']);
        return;
    }
    this.weeks.push(sw);
    this.weeks.push(ew);
    this.performans = this.dataService.getData().performans;
    Object.keys(this.performans).forEach((el: any, index: number) => {
      if (index == 0) {
        this.createChart(this.performans[el]);
      }
      if (index == 1) {
        this.createChart2(this.performans[el]);

      }

    });

  }
  createChart(el: any) {
    let label = el.map((data: any) => {
      return data.calisan.personelAdi + data.calisan.personelSoyadi;
    });
    let data = el.map((data: any) => {
      return data.ccsPuani;
    });

    let ypd = el.map((data: any) => {
      return data.ypdPuani;
    });
    let ycs = el.map((data: any) => {
      return data.ycsPuani;
    });
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: label,
        datasets: [
          {
            label: "ÇÇS Puanı",
            data: data,
            backgroundColor: 'blue'
          },
          {
            label: "YPD Puanı",
            data: ypd,
            backgroundColor: 'limegreen'
          },
          {
            label: "YCS Puanı",
            data: ycs,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
  createChart2(el: any) {
    let label = el.map((data: any) => {
      return data.calisan.personelAdi + data.calisan.personelSoyadi;
    });
    let data = el.map((data: any) => {
      return data.ccsPuani;
    });

    let ypd = el.map((data: any) => {
      return data.ypdPuani;
    });
    let ycs = el.map((data: any) => {
      return data.ycsPuani;
    });
    this.chart2 = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: label,
        datasets: [
          {
            label: "ÇÇS Puanı",
            data: data,
            backgroundColor: 'blue'
          },
          {
            label: "YPD Puanı",
            data: ypd,
            backgroundColor: 'limegreen'
          },
          {
            label: "YCS Puanı",
            data: ycs,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
  detail(id: any) {
    this.router.navigate(['/analiysis-detail', id]);

  }
  goBack() {
    window.history.back();
  }
}
