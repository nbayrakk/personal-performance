import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { DataService } from './../../../service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ccs',
  templateUrl: './ccs.component.html',
  styleUrls: ['./ccs.component.scss']
})
export class CcsComponent implements OnInit {
  ccs: any;
  public chart: any;

  constructor(private dataService: DataService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.ccs = this.dataService.getData().ccs;
    console.log(this.ccs);
    if (!this.ccs) {
      this.router.navigate(['/period']);
      return;
    }
    this.ccs.sort((a:any, b:any) => {
      return a.ccsPuani - b.ccsPuani
    });
    let label = this.ccs.map((data: any) => {
      return data.calisan.personelAdi + data.calisan.personelSoyadi;
    });
    let data = this.ccs.map((data: any) => {
      return data.ccsPuani;
    });

    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: label,
        datasets: [
          {
            label: "ÇÇS Paunı",
            data: data,
            backgroundColor: 'blue',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
      }

    });
  }
  next() {

    this.router.navigate(['/calc-select']);
  }
  goBack() {
    window.history.back();
  }
}
