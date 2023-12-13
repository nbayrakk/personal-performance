import { DataService } from './../../../service/data.service';
import { HttpService } from './../../../service/http.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  text: string = '';
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
    let week = this.dataService.getData().performanceWeek;
    if (!week) {
      this.router.navigate(['/performans']);
      return;

    }
    this.api.get('performans/getPersonalByHaftalar?hafta1=' + week.hafta_sira + '&hafta2=' + 0 + '&personelId=' + this.id)
    .subscribe(res => {
      this.detail = res;
      this.getText();
      this.loading = false
    });
  }
  getText() {
    let week = this.dataService.getData().performanceWeek;
    if (!week.hafta_sira) {
      this.router.navigate(['/performans']);
      return;

    }


  }
  goBack() {
    window.history.back();
  }
}
