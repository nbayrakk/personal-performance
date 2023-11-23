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
    this.api.get('haftalar/allHaftalar').subscribe(res => {
      console.log(res);
      this.weeks = res;
    });
  }
  getTeam() {
    this.api.get('department/allDepartments').subscribe(res => {
      console.log(res);
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
    this.api.get('performans/getCcsYcsYpdEkipPersonal?hafta1=' + this.selectedStartWeek.hafta_sira + '&hafta2=' + this.selectedEndWeek.hafta_sira + '&ekip=' + this.selectedTeam).subscribe(res => {
      console.log(res);
      let performans: any = {};
      Object.keys(res).forEach((r: any) => {
        res[r].forEach((el: any) => {
          if (!performans[el.haftaSira]) {
            performans[el.haftaSira] = [];
          }
          performans[el.haftaSira].push(el);
        });
      });

      console.log(performans);
      this.dataService.setData('performans', performans);
      this.router.navigate(['/analiysis-result']);
    });

  }
}