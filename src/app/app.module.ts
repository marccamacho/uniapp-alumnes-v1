import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';

import { AppRoutingModule }           from './app-routing.module';
import { AppComponent }               from './app.component';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

import { FlexLayoutModule }           from '@angular/flex-layout';
import { HttpClientModule }           from '@angular/common/http';


// Material imports
import { MatIconModule }              from '@angular/material/icon';
import { MatToolbarModule }           from '@angular/material/toolbar';
import { MatMenuModule }              from '@angular/material/menu';
import { MatButtonModule }            from '@angular/material/button';
import { MatCardModule }              from '@angular/material/card';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { MatProgressBarModule }       from '@angular/material/progress-bar';
import { MatTooltipModule }           from '@angular/material/tooltip';

// Custom Components
import { TopbarComponent }            from './topbar/topbar.component';
import { IniciComponent }             from './inici/inici.component';
import { BotonsPrincipalsComponent }  from './botons-principals/botons-principals.component';
//import { ExpedientModule }            from './expedient/expedient.module';

// Custom module
//import { AgendaModule }               from './agenda/agenda.module';

// Pipes
import { TruncatePipe }               from './shared/pipes/pipes/max-chars-pipe';
import { ProjectesComponent } from './projectes/projectes.component';
import { MaterialComponent } from './material/material.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    IniciComponent,
    BotonsPrincipalsComponent,
    TruncatePipe,
    ProjectesComponent,
    MaterialComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule, 
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    FlexLayoutModule,
    //ExpedientModule,
    //AgendaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
