import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NavBarComponent } from './navbar/navbar.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroComponent } from './hero/hero.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MatDialogModule, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    NavBarComponent,
    HeroDetailComponent,
    MessagesComponent,
    AboutComponent,
    DashboardComponent,
    HeroComponent,
    HeroSearchComponent,
    HeroFormComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatDialogModule
    
  ],
  providers: [
    MatDialog,
    {provide: MatDialogRef,useValue: {}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
