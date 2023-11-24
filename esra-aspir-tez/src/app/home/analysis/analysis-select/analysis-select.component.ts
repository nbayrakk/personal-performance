import { DataService } from './../../../service/data.service';
import { Router } from '@angular/router';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-select',
  templateUrl: './analysis-select.component.html',
  styleUrls: ['./analysis-select.component.scss']
})
export class AnalysisSelectComponent implements OnInit {
  selectedTeam: any;
  selectedStartWeek: any;
  selectedEndWeek: any;
  weeks: any;
  teams: any;
  loading = false;
  constructor(
    private api: HttpService,
    private router: Router,
    private dataService: DataService
  ) {

  }
  ngOnInit(): void {
    this.getWeeks();
    this.getTeam();
  }

  getWeeks() {
    this.loading = true;
    this.api.get('haftalar/allHaftalar').subscribe(res => {
      this.loading = false;
      this.weeks = res;
    });
  }
  getTeam() {
    this.loading = true;
    this.api.get('department/allDepartments').subscribe(res => {
      this.loading = false;
      this.teams = res;
    });

  }
  selectTeam(option: any) {
    this.selectedTeam = option;

  }
  selectOption(option: string) {
    this.selectedTeam = option;
  }
  selectOptionStartWeek(option: string) {
    this.selectedStartWeek = option;
    this.dataService.setData('selectedStartWeek', this.selectedStartWeek);

  }
  selectOptionEndWeek(option: string) {
    this.selectedEndWeek = option;
    this.dataService.setData('selectedEndWeek', this.selectedEndWeek);
  }

  next() {
    this.loading = true;
    this.api.get('performans/getCcsYcsYpdEkipPersonal?hafta1=' + this.selectedStartWeek.hafta_sira + '&hafta2=' + this.selectedEndWeek.hafta_sira + '&ekip=' + this.selectedTeam).subscribe(res => {
      this.loading = false;
      let performans: any = {};
      Object.keys(res).forEach((r: any) => {
        res[r].forEach((el: any) => {
          if (!performans[el.haftaSira]) {
            performans[el.haftaSira] = [];
          }
          performans[el.haftaSira].push(el);
        });
      });
      this.dataService.setData('performans', performans);
      this.router.navigate(['/analiysis-result']);
    });

  }

  home() {

    this.router.navigate(['/home']);

  }
}
