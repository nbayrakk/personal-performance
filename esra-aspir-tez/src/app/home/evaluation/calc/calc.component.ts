import { Router } from '@angular/router';
import { HttpService } from './../../../service/http.service';
import { DataService } from './../../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  ccs: any;
  inputValues: string[] = [];
  loading = false;
  show = false;
  constructor(private dataService: DataService,
    private api: HttpService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.ccs = this.dataService.getData().ccs;
    this.ccs.sort((a:any, b:any) => {
      return a.calisan.personelId - b.calisan.personelId
    });
    if (!this.ccs) {
      this.router.navigate(['/period']);
      return;
    }
  }
  change($event: any, i: any) {
    console.log($event, i);
  }
  check(i: any) {
    if (parseInt(this.inputValues[i] + "") == 0) {
      return true;
    }
    if (parseInt(this.inputValues[i] + "") < 74) {
      return true;
    }
    if (parseInt(this.inputValues[i] + "") > 101) {
      return true;
    }
    return false;
  }
  next() {
    this.ccs.forEach((data: any, index: number) => {
      data.yp = this.inputValues[index] ? this.inputValues[index] : null;
    });
    if (this.inputValues.length != this.ccs.length) {
      this.show = true;
      return;
    }else {
      this.show = false;
    }
    this.inputValues.forEach(el => {
      if (!el) {
        this.show = true;
      }
    });
    if (this.show) return;
    this.loading = true;

    let data: any = [];
    let weekId = this.dataService.getData().week;
    let agirlik = this.dataService.getData().agirlik;
    this.ccs.forEach((el: any) => {
      data.push({
        haftaId: weekId,
        agirlik: agirlik,
        yoneticiPuani: el.yp,
        personalId: el.personelId
      });
    });
    this.api.post('performans/updateYoneticiPuaniYpd', data).subscribe(res => {
      this.dataService.setData('ypd', res);
      this.router.navigate(['/calc-result']);
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  goBack() {
    window.history.back();
  }
}
