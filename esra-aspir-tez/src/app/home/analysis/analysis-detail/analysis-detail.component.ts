import { Chart } from 'chart.js/auto';
import { DataService } from './../../../service/data.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {
  id!: any;
  loading = false;
  chart: any;
  detail: any;
  constructor(private route: ActivatedRoute,
    private api: HttpService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getDetail();
    });
  }
  getDetail() {
    this.loading = true;
    let startWeek = this.dataService.getData().selectedStartWeek;
    let endWeek = this.dataService.getData().selectedEndWeek;
    if (!startWeek || !endWeek) {
      this.router.navigate(['/analiysis-select']);
      return;
    }
    this.loading = true;

    this.api.get('performans/getPersonalByHaftalar?hafta1=' + startWeek.hafta_sira + '&hafta2=' + endWeek.hafta_sira + '&personelId=' + this.id).subscribe(res => {
      console.log(res);
      this.loading = true;
      this.detail = res;
      this.loading = false;
      this.createChart();
    },err=>{
      this.loading = false;
    });
  }
  createChart() {
    let label = this.detail.map((data: any) => {
      return data.haftalar.tarih;
    });
    let data = this.detail.map((data: any) => {
      return data.ccsPuani;
    });

    let ypd = this.detail.map((data: any) => {
      return data.ypdPuani;
    });
    let ycs = this.detail.map((data: any) => {
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
        aspectRatio: 2.5
      }

    });

  }
  goBack() {
    window.history.back();
  }
}
