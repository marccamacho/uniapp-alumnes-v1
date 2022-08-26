import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';

import { AppRoutingModule }           from './app-routing.module';
import { AppComponent }               from './app.component';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

import { FlexLayoutModule }           from '@angular/flex-layout';

// Material imports
import { MatIconModule }              from '@angular/material/icon';
import { MatToolbarModule }           from '@angular/material/toolbar';
import { MatMenuModule }              from '@angular/material/menu';
import { MatButtonModule }            from '@angular/material/button';

// Custom Components
import { TopbarComponent }            from './topbar/topbar.component';
import { IniciComponent }             from './inici/inici.component';
import { BotonsPrincipalsComponent }  from './botons-principals/botons-principals.component';
// import { VistaExpedientComponent }    from './vista-expedient/vista-expedient.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    IniciComponent,
    BotonsPrincipalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule, 
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
