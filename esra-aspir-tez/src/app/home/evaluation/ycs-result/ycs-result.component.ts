import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { DataService } from './../../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { Ticks } from 'chart.js';

@Component({
  selector: 'app-ycs-result',
  templateUrl: './ycs-result.component.html',
  styleUrls: ['./ycs-result.component.scss']
})
export class YcsResultComponent implements OnInit{
  public chart: any;
  ccs: any;
  ypd:any;
  ycs:any;
  constructor(
    private dataService:DataService,
    private router:Router
  ){

  }

  ngOnInit(): void {
    this.ccs = this.dataService.getData().ccs;
    this.ypd = this.dataService.getData().ypd;
    this.ycs = this.dataService.getData().ycs;
    this.ycs.sort((a:any, b:any) => {
      return a.ycsPuani - b.ycsPuani
    });
    let label = this.ccs.map((data: any) => {
      return data.calisan.personelAdi + data.calisan.personelSoyadi;
    });
    let data = this.ccs.map((data: any) => {
      return data.ccsPuani;
    });

    let ypd  = this.ypd.map((data: any) => {
      return data.ypdPuani;
    });
    let ycs =  this.ycs.map((data: any) => {
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
            label: "YPS Puanı",
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
        aspectRatio: 2.5,

      }

    });
  }
  next(){
    this.router.navigate(['/home']);

  }
  goBack() {
    window.history.back();
  }
}
