import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AuthService } from './auth.service';
import { FinanceService } from './finance.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { InterestComponent } from './interest/interest.component';
import { LoginComponent } from './login/login.component';
import { RegisterNewFamilyComponent } from './register-new-family/register-new-family.component';
import { RegisterToFamilyComponent } from './register-to-family/register-to-family.component';
import { ReportComponent } from './report/report.component';
import { RegistwindowModalComponent } from './registwindow-modal/registwindow-modal.component';
import { LoginPage } from './login/login.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { InputFinanceComponent } from './input-finance/input-finance.component';
import { InputSavingsComponent } from './input-savings/input-savings.component';
import { InputInvestComponent } from './input-invest/input-invest.component';
// import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';
import { ShortNumberPipe } from './short-number.pipe';
import { InvestmentModalComponent } from './investment-modal/investment-modal.component';
import { FinanceliteracyModalComponent } from './financeliteracy-modal/financeliteracy-modal.component';
import { TabunganModalComponent } from './tabungan-modal/tabungan-modal.component';

// import 'chartjs-plugin-zoom';


const appRoutes:Routes =[
  {path:'home', component:HomeComponent},
  {path:'history', component:HistoryComponent},
  {path:'interest', component:InterestComponent},
  {path:'login', component:LoginComponent},
  {path:'registernewfamily', component:RegisterNewFamilyComponent},
  {path:'registertofamily', component:RegisterToFamilyComponent},
  {path:'report', component:ReportComponent},
  {path:'inputfinance', component:InputFinanceComponent},
  {path:'inputsavings', component:InputSavingsComponent},
  {path:'inputinvest', component:InputInvestComponent},
  {path:'settings', component:SettingsComponent},
  {path:'modalInvest', component:InvestmentModalComponent},
  {path:'modalfinance', component:FinanceliteracyModalComponent},
  {path:'modaltabungan', component:TabunganModalComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, HistoryComponent,InterestComponent, LoginComponent, RegisterNewFamilyComponent, RegisterToFamilyComponent, ReportComponent, RegistwindowModalComponent,InputInvestComponent,
    InputSavingsComponent, InputFinanceComponent, InvestmentModalComponent, FinanceliteracyModalComponent, TabunganModalComponent, SettingsComponent, ShortNumberPipe],
  entryComponents: [RegistwindowModalComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule,ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes), SuperTabsModule.forRoot(), ChartModule, BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    FinanceService,
    SuperTabsModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
