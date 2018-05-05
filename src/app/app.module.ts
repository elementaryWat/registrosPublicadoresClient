import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { PublicadoresComponent } from './components/publicadores.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ROUTES } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    PublicadoresComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ROUTES
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
