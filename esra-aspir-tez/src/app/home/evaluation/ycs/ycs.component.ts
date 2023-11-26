import { Router } from '@angular/router';
import { DataService } from './../../../service/data.service';
import { HttpService } from './../../../service/http.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ycs',
  templateUrl: './ycs.component.html',
  styleUrls: ['./ycs.component.scss'],
})
export class YcsComponent implements OnInit {
  yac: number = 0;
  yc: number = 0;
  yp: number = 0;
  show = false;
  disabled = true;
  loading = false;
  constructor(
    private api: HttpService,
    private dataService: DataService,
    private router: Router
  ) {

  }
  ngOnInit(): void {

  }
  isDisabled() {
    if (this.yac && this.yc && this.yp) {
      return false;
    }
    return true
  }
  next() {
    if (this.yac + this.yc + this.yp > 100 || this.yac + this.yc + this.yp < 100) {
      this.show = true;
      return;
    }
    this.loading = true;

    let weekId = this.dataService.getData().week;

    this.api.post('performans/updateYenidenAcilanCagriPuaniYcs', {
      haftaId: weekId,
      yenidenAcilanPuan: this.yac,
      yoneticiPuan: this.yp,
      cagriSayisiPuan: this.yc
    }).subscribe(res => {
      this.loading = false;
      this.dataService.setData('ycs', res);
      this.router.navigate(['/ycs-result']);
    }, err => {
      this.loading = false;
    });
  }
  goBack() {
    window.history.back();
  }
}
