import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EvaluationComponent } from './home/evaluation/evaluation.component';
import { PeriodComponent } from './home/evaluation/period/period.component';
import { CcsComponent } from './home/evaluation/ccs/ccs.component';
import { NgbAlertModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalcSelectComponent } from './home/evaluation/calc-select/calc-select.component';
import { CalcComponent } from './home/evaluation/calc/calc.component';
import { CalcResultComponent } from './home/evaluation/calc-result/calc-result.component';
import { YcsComponent } from './home/evaluation/ycs/ycs.component';
import { YcsResultComponent } from './home/evaluation/ycs-result/ycs-result.component';
import { AnalysisSelectComponent } from './home/analysis/analysis-select/analysis-select.component';
import { AnalysisResultComponent } from './home/analysis/analysis-result/analysis-result.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnalysisDetailComponent } from './home/analysis/analysis-detail/analysis-detail.component';
import { PerformansComponent } from './home/performans/performans/performans.component';
import { PerformansDetailComponent } from './home/performans/performans-detail/performans-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EvaluationComponent,
    PeriodComponent,
    CcsComponent,
    CalcSelectComponent,
    CalcComponent,
    CalcResultComponent,
    YcsComponent,
    YcsResultComponent,
    AnalysisSelectComponent,
    AnalysisResultComponent,
    AnalysisDetailComponent,
    PerformansComponent,
    PerformansDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    NgbAlertModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
