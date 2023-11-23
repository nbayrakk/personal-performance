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
  data:any = [];
  chart: any;
  public chartType: string = "doughnut";
  public chartLabel: string[] = [];
  public chartData: number[] = [];

  constructor(private api: HttpService) {

  }
  ngOnInit(): void {
    this.getWeeks();
  }
  selectWeek(option: any) {
    this.selectedWeek = option;
    this.getPerformans();
  }
  getWeeks() {
    this.loading = true;
    this.api.get('haftalar/allHaftalar').subscribe(res => {
      console.log(res);
      this.weeks = res;
      this.loading = false;
    });
  }
  chartFilled(label: any, data: any, color: any) {


    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: label,
        datasets: [{
          label: '# of Votes',
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
      this.loading = false;
      console.log(res);
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
      this.chartFilled(label, data, color);

    });
  }
  detail(id:any){

  }

}
