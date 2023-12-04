import { Router } from '@angular/router';
import { DataService } from './../../../service/data.service';
import { Chart } from 'chart.js/auto';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calc-result',
  templateUrl: './calc-result.component.html',
  styleUrls: ['./calc-result.component.scss']
})
export class CalcResultComponent {
  public chart: any;
  ccs: any;
  ypd:any;
  constructor(
    private dataService:DataService,
    private router:Router
  ){

  }

  ngOnInit(): void {
    this.ccs = this.dataService.getData().ccs;
    this.ypd = this.dataService.getData().ypd;
    if (!this.ccs || !this.ypd) {
      this.router.navigate(['/period']);
      return;
    }
    this.ypd.sort((a:any, b:any) => {
      return a.ypdPuani - b.ypdPuani
    });
    let label = this.ypd.map((data: any) => {
      return data.calisan.personelAdi + data.calisan.personelSoyadi;
    });
    let data = this.ypd.map((data: any) => {
      return data.ccsPuani;
    });

    let ypd  = this.ypd.map((data: any) => {
      return data.ypdPuani;
    });

    console.log(ypd)
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
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
  next(){
    this.router.navigate(['/ycs']);

  }
  goBack() {
    window.history.back();
  }
}
