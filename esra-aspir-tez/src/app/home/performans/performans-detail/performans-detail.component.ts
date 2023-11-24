import { DataService } from './../../../service/data.service';
import { HttpService } from './../../../service/http.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-performans-detail',
  templateUrl: './performans-detail.component.html',
  styleUrls: ['./performans-detail.component.scss']
})
export class PerformansDetailComponent {
  id!: any;
  loading = false;
  chart: any;
  detail: any;
  constructor(private route: ActivatedRoute,
    private api: HttpService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getDetail();
    });
  }
  getDetail() {
    this.loading = true;
    let week = this.dataService.getData().performanceWeek;
    this.api.get('performans/getPersonalByHaftalar?hafta1=' + week.hafta_sira + '&hafta2=' + 0 + '&personelId=' + this.id).subscribe(res => {
      console.log(res);
      this.loading = true;
      this.detail = res;
    });
  }
  goBack() {
    window.history.back();
  }
}
