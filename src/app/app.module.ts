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
import {  EliminarPublicadorComponent } from './components/publicadores/eliminar/eliminar.component';
import { AgregarEditarFamiliaComponent } from './components/publicadores/agregar-editar-familia/agregar-editar-familia.component';
import { FiltropublicadoresComponent } from './components/publicadores/filtropublicadores/filtropublicadores.component';
import { DetailComponent } from './components/publicadores/detail/detail.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { GeneralComponent } from './components/publicadores/detail/general.component';
import { InformesComponent } from './components/informes/informes.component';
import { InformesService } from './services/informes.service';
import { AgregarEditarInformeComponent } from './components/informes/agregar-editar/agregar-editar.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicadoresComponent,
    NavbarComponent,
    LoginComponent,
    AgregarPublicadorComponent,
    EliminarPublicadorComponent,
    AgregarEditarFamiliaComponent,
    FiltropublicadoresComponent,
    DetailComponent,
    FechaPipe,
    GeneralComponent,
    InformesComponent,
    AgregarEditarInformeComponent,
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
  providers: [LoginService,PublicadoresService,SocketService, InformesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
