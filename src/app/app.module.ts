import { PublicadoresService } from './services/publicadores.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PublicadoresComponent } from './components/publicadores.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ROUTES } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { AgregarPublicadorComponent } from './components/publicadores/agregar-publicador/agregar-publicador.component';
import { MyDatePickerModule } from 'mydatepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SocketService } from './services/socket.service';


@NgModule({
  declarations: [
    AppComponent,
    PublicadoresComponent,
    NavbarComponent,
    LoginComponent,
    AgregarPublicadorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ROUTES,
    MyDatePickerModule,
    TooltipModule.forRoot()
  ],
  providers: [LoginService,PublicadoresService,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
