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
import * as io from 'socket.io-client';

import { Publicador } from '../interfaces/publicador.interface';

@Injectable()
export class InformesService {
  headersGet:Headers;
  headersPost:Headers;
  url:string;
  openDialogInforme=new  BehaviorSubject(false);
  modoDialogInforme:string="add";
  hermanoSeleccionado:Publicador;
  informeSeleccionado:Informe;
  currentMonth:number=9;
  currentYear:number=2018;
  socketGlobal:any;
  socketShared:any;
  socketInformes:any;


  constructor(private http: Http,
    private userService: LoginService, 
    private hermanoService:PublicadoresService,
    private socketService:SocketService) { 
      this.socketShared=io(GLOBAL.socketUrl);
       this.url = GLOBAL.url + "/informes";
      this.socketGlobal=socketService.socket;
      this.headersGet=new Headers({ 'Authorization': this.userService.getTokenActual() });
      this.headersPost=new Headers({
        'Authorization': this.userService.getTokenActual(),
        'Content-Type': 'application/json'
      });
    }

  obtenerInformes(){
    this.socketInformes = io(GLOBAL.socketUrl);
    this.socketInformes.emit('lista-informes-inicial',this.currentMonth,this.currentYear);
    let observable = new Observable<any>(observer => {
      this.socketInformes.on('informes', (month, year) => {
        if(month==this.currentMonth && year==this.currentYear)
        {
          return this.http.get( `${this.url}/listaInformes/${this.userService.getUsuarioActual().congregacion._id}?month=${this.currentMonth}&year=${this.currentYear}`  , { headers:this.headersGet })
          .map(res => {
            return res.json();
          }).subscribe(data => {
            observer.next(data);
          })
        }
      })
      return () => {
        this.socketInformes.disconnect();
      };
    })
    return observable;
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

  agregarInforme(informe: Informe) {
    return new Promise((resolve, reject)=>{
      let body = JSON.stringify(Object.assign(informe,{month:this.currentMonth,year:this.currentYear}));
      this.http.post(this.url + "/", body, { headers:this.headersPost })
        .map(res => {
          return res.json();
        }).subscribe(data=>{
         this.socketGlobal.emit('lista-informes-updated', informe.month, informe.year);
          resolve(data);
        },error=>{
          reject(error);
        })
    })
  }
  editarInforme(informe: Informe) {
    return new Promise((resolve, reject)=>{
      let body = JSON.stringify(Object.assign(informe,{month:this.currentMonth,year:this.currentYear}));
      this.http.put(`${this.url}/${informe._id}`, body, { headers:this.headersPost })
        .map(res => {
          return res.json();
        }).subscribe(data=>{
         this.socketGlobal.emit('lista-informes-updated', informe.month, informe.year);
          resolve(data);
        },error=>{
          reject(error);
        })
    })
  }

}
