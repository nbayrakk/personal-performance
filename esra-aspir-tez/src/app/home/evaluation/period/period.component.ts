
import { DataService } from './../../../service/data.service';
import { HttpService } from './../../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  weeks: any = [];
  selectedWeek: any;
  loading = false;
  disabled: boolean = true;


  constructor(
    private api: HttpService,
    private dataService: DataService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.getWeeks();
  }

  getWeeks() {
    this.loading = true;
    this.api.get('haftalar/allHaftalar').subscribe(res => {
      console.log(res);
      this.weeks = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });

  }
  selectWeek(option: any) {
    this.selectedWeek = option;
    this.disabled = false;

  }
  next() {
    if (!this.selectedWeek) {
      this.disabled = true;
      return;
    }
    this.loading = true;
    this.api.post('performans/updateBakilanCagriTamCcs?haftaId=' + this.selectedWeek.hafta_sira, {}).subscribe(res => {
      console.log(res);
      this.dataService.setData('week', this.selectedWeek.hafta_sira);
      this.dataService.setData('ccs', res);
      this.router.navigate(['/ccs']);
      this.loading = false;

    }, err => {
      this.loading = false;
    });

  }
  goBack() {
    window.history.back();
  }
}
