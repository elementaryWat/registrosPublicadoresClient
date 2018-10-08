import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from './login.service';
import { SocketService } from './socket.service';
import { GLOBAL } from '../GLOBAL';
import { PublicadoresService } from './publicadores.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Familia } from '../interfaces/familia.interface';

import { Informe } from '../interfaces/informe.interface';

import * as _ from 'lodash';
import { Publicador } from '../interfaces/publicador.interface';

@Injectable()
export class InformesService {
  headersGet:Headers;
  headersPost:Headers;
  url:string;
  openDialogInforme=new  BehaviorSubject(false);
  modoDialogInforme:string="add";
  hermanoSeleccionado:Publicador;

  constructor(private http: Http,
    private userService: LoginService, 
    private hermanoService:PublicadoresService,
    private socketService:SocketService) { 
       this.url = GLOBAL.url + "/informes";

      this.headersGet=new Headers({ 'Authorization': this.userService.getTokenActual() });
      this.headersPost=new Headers({
        'Authorization': this.userService.getTokenActual(),
        'Content-Type': 'application/json'
      });
    }

  obtenerInformes(){
    return this.http.get(this.url + "/listaInformes/" + this.userService.getUsuarioActual().congregacion._id, { headers:this.headersGet })
          .map(res => {
            return res.json();
          });
  }
  obtenerInformePorHermano(){
    return Observable.combineLatest(this.hermanoService.hermanosPorFamiliaS,this.obtenerInformes())
      .map(data=>{return this.joinHermanosWithInformes(<any>data[0],data[1].informes)} )
  }

  joinHermanosWithInformes(hermanosPorFamilia:Familia[],informes:Informe[]){
    /* console.log(hermanosPorFamilia);
    console.log(informes); */
    
    return _.map(hermanosPorFamilia,(hermanosFamilia)=>{
      let integrantes=_.map(hermanosFamilia.integrantes,(hermano)=>{
        return _.assign(hermano, {informe:_.find( informes, ['hermano', hermano['_id']] )} );
      })

      return _.assign(hermanosFamilia,{integrantes})
    })
  }

}
