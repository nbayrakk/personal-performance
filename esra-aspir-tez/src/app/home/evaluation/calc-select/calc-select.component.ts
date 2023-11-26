import { DataService } from './../../../service/data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calc-select',
  templateUrl: './calc-select.component.html',
  styleUrls: ['./calc-select.component.scss']
})
export class CalcSelectComponent {
  selectedValue: any;
  disabled: boolean = true;
  constructor(private router: Router,
    private dataService: DataService) {

  }
  goBack() {
    window.history.back();
  }
  next() {
    if (!this.selectedValue) {
      this.disabled = true;
      return;
    }
    this.dataService.setData('agirlik', this.selectedValue);
    this.router.navigate(['/calc']);

  }
  selectOption(value: any) {
    this.selectedValue = value;
    this.disabled = false;

  }
}
