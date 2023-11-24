import { PerformansDetailComponent } from './home/performans/performans-detail/performans-detail.component';
import { AnalysisDetailComponent } from './home/analysis/analysis-detail/analysis-detail.component';
import { AnalysisSelectComponent } from './home/analysis/analysis-select/analysis-select.component';
import { YcsResultComponent } from './home/evaluation/ycs-result/ycs-result.component';
import { YcsComponent } from './home/evaluation/ycs/ycs.component';
import { CalcResultComponent } from './home/evaluation/calc-result/calc-result.component';
import { CalcSelectComponent } from './home/evaluation/calc-select/calc-select.component';
import { PeriodComponent } from './home/evaluation/period/period.component';
import { CcsComponent } from './home/evaluation/ccs/ccs.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationComponent } from './home/evaluation/evaluation.component';
import { CalcComponent } from './home/evaluation/calc/calc.component';
import { AnalysisResultComponent } from './home/analysis/analysis-result/analysis-result.component';
import { PerformansComponent } from './home/performans/performans/performans.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'evaluation', component: EvaluationComponent,
  },
  { path: 'ccs', component: CcsComponent },
  { path: 'period', component: PeriodComponent },
  { path: 'calc-select', component: CalcSelectComponent },
  { path: 'calc', component: CalcComponent },
  { path: 'calc-result', component: CalcResultComponent },
  { path: 'ycs', component: YcsComponent },
  { path: 'ycs-result', component: YcsResultComponent },
  { path: 'analiysis-select', component: AnalysisSelectComponent },
  { path: 'analiysis-result', component: AnalysisResultComponent },
  { path: 'analiysis-detail/:id', component: AnalysisDetailComponent },
  { path: 'performans', component: PerformansComponent },
  { path: 'performans-detail/:id', component: PerformansDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
