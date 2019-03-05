import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatNativeDateModule } from '@angular/material';
import { MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WitchesComponent } from './witches/witches.component';
import { WitchService } from './witches/service/witch.service';
import { HomeComponent } from './home/home.component';

import { FormsModule } from "@angular/forms";
import { WitchFormComponent } from './witches/witch-form/witch-form.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'witches', component: WitchesComponent},
  {path: 'witches/form/:id/:action', component: WitchFormComponent},
  {path: 'witches/form', component: WitchFormComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    WitchesComponent,
    HomeComponent,
    WitchFormComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [WitchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
