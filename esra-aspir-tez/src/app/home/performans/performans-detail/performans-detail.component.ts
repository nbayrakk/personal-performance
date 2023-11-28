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
    this.api.get('performans/getPersonalByHaftalar?hafta1=' + week.hafta_sira + '&hafta2=' + 0 + '&personelId=' + this.id).subscribe(res => {
      this.detail = res;
      this.getText();

    });
  }
  getText() {
    let week = this.dataService.getData().performanceWeek;
    if (!week.hafta_sira) {
      this.router.navigate(['/performans']);
      return;

    }

    this.api.get('performans/getPersonalCagriSayiSureTahmin?personelId=' + this.id).subscribe(res => {
      let sName = this.detail[0].calisan.personelSoyadi.trim()
      this.text += this.detail[0].calisan.personelAdi.charAt(0).toUpperCase() + this.detail[0].calisan.personelAdi.slice(1).toLowerCase() + " ";
      this.text += sName.charAt(0).toUpperCase() + sName.slice(1).toLowerCase();
      this.text += " sonraki haftalarda ki tahmini çözülmesi beklenen çağrı sayısı: ";
      this.text += res[0]['Tahmini Çözülen Çağrı Sayısı'].toFixed(2);
      this.text += ", yeniden açılması beklenen çağrı adedi: ";
      this.text += res[1]['Tahmini Açılması Beklenen Çağrı Adedi'].toFixed(2);
      this.loading = false;
    },err=>{
      this.loading = false;
    });
  }
  goBack() {
    window.history.back();
  }
}
