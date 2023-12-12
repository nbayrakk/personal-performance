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
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  text: string = "";
  public lineChartLegend = true;
  public lineChartType = 'line';
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
  gettext() {
    this.loading = true
    this.api.get('performans/getPersonalCagriSayiSureTahmin?personelId=' + this.id).subscribe(res => {
      let sName = this.detail[0].calisan.personelSoyadi.trim();
      this.text += this.detail[0].calisan.personelAdi.charAt(0).toUpperCase() + this.detail[0].calisan.personelAdi.slice(1).toLowerCase() + " ";
      this.text += sName.charAt(0).toUpperCase() + sName.slice(1).toLowerCase();
      this.text += " sonraki haftalarda ki tahmini çözülmesi beklenen çağrı sayısı: ";
      this.text += res[0]['Tahmini Çözülen Çağrı Sayısı'].toFixed(2);
      this.text += ", yeniden açılması beklenen çağrı adedi: ";
      this.text += res[1]['Tahmini Açılması Beklenen Çağrı Adedi'].toFixed(2);
      this.loading = false;
    }, err => {
      this.loading = false;
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

    this.api.get('performans/getPersonalByHaftalarBtwHafta?hafta1=' + startWeek.hafta_sira + '&hafta2=' + endWeek.hafta_sira + '&personelId=' + this.id)
      .subscribe(res => {
        console.log(res);
        this.detail = res;
        this.loading = false;
        this.gettext();
        setTimeout(() => {
          this.createChart();
          this.createChart2();
        }, 100);

      }, err => {
        this.loading = false;
      });
  }
  createChart() {
    let xlabel = [];
    for (let i = 0; i < this.detail.length; i++) {

      xlabel.push(this.detail[i].haftalar.tarih);
    }
    let data = this.detail.map((d: any) => d.bakilanCagriTam);
    let ctx = document.getElementById(`MyChart1`) as HTMLCanvasElement;
    for (let index = 0; index < this.detail.length; index++) {


    }
    let myChart = new Chart(ctx, {
      type: 'line',

      data: {
        xLabels: xlabel,
        datasets: [
          {
            label: 'Bakılan Çağrı',
            backgroundColor: "blue",
            borderColor: "blue",
            data: data
          }
        ],

      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createChart2() {
    let xlabel = [];
    for (let i = 0; i < this.detail.length; i++) {

      xlabel.push(this.detail[i].haftalar.tarih);
    }
    let data1 = this.detail.map((d: any) => d.yenidenAcilanCagriTam);
    let ctx = document.getElementById(`MyChart2`) as HTMLCanvasElement;

    let myChart = new Chart(ctx, {
      type: 'line',

      data: {
        xLabels: xlabel,
        datasets: [
          {
            label: 'Yeniden Açılan Çağrı',
            backgroundColor: "red",
            borderColor: "red",
            data: data1
          },
        ],

      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  goBack() {
    window.history.back();
  }
}
