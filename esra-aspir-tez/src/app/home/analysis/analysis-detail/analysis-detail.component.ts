import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route)
    // const state = this.route.snapshot.root.firstChild?['snapshot']
    this.route.queryParams.subscribe(params => {
      console.log(params)
      // Diğer verileri al
    });
  }
}
