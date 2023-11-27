import { Router } from '@angular/router';
import { DataService } from './../../../service/data.service';
import { Chart } from 'chart.js/auto';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performans',
  templateUrl: './performans.component.html',
  styleUrls: ['./performans.component.scss']
})
export class PerformansComponent implements OnInit {
  selectedWeek: any;
  loading = false;
  weeks: any = [];
  data: any = [];
  chart: any;
  public chartType: string = "doughnut";
  public chartLabel: string[] = [];
  public chartData: number[] = [];

  constructor(private api: HttpService,
    private router: Router,
    private dataService: DataService) {

  }
  ngOnInit(): void {
    let pWeek = this.dataService.getData().performanceWeek;
    if (pWeek) {
      this.selectedWeek = pWeek;
      this.getPerformans();
    }
    this.getWeeks();
  }
  selectWeek(option: any) {
    this.selectedWeek = option;
    this.dataService.setData('performanceWeek', this.selectedWeek);
    this.getPerformans();
  }
  getWeeks() {
    this.loading = true;
    this.api.get('haftalar/allHaftalar').subscribe(res => {
      this.weeks = res;
      this.loading = false;
    });
  }
  chartFilled(label: any, data: any, color: any) {

    const ctx = document.getElementById('MyChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: label,
        datasets: [{
          label: 'ÇÇS',
          data: data,
          backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
        }]
      },
    });
  }

  getPerformans() {
    this.loading = true;
    this.api.get('performans/allPerformansByHafta?hafta=' + this.selectedWeek.hafta_sira).subscribe(res => {
      this.data = res;
      this.data.sort((a: any, b: any) => {
        return a.ccsPuani - b.ccsPuani;
      });
      this.loading = false;
      let label = this.data.map((data: any) => {
        return data.calisan.personelAdi + data.calisan.personelSoyadi;
      });
      let data = this.data.map((data: any) => {
        return data.ccsPuani;
      });

      let color: any = [];
      this.data.forEach((el: any) => {
        const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
        const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
        color.push(randomRGB);
      });
      if (this.chart) {
        this.chart.destroy();
      }
      this.chartFilled(label, data, color);

    }, err => {
      this.loading = false;
    });
  }
  detail(id: any) {
    this.router.navigate(['/performans-detail', id]);
  }
  goBack() {
    window.history.back();
  }
  home() {
    this.router.navigate(['/home']);

  }
}
