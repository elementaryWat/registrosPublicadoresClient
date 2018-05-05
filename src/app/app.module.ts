import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PublicadoresComponent } from './components/publicadores.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    PublicadoresComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
