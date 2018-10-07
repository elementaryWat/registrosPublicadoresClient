import { Familia } from './../interfaces/familia.interface';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Publicador } from '../interfaces/publicador.interface';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { SocketService } from './socket.service';
import { NullAstVisitor } from '@angular/compiler';

@Injectable()
export class PublicadoresService {
  url: string;
  hermanosPorFamilia: Familia[];
  hermanosPorFamiliaS: BehaviorSubject<Familia[]>;
  listaHermanosPorFamiliaInicial:boolean;
  familiaSeleccionada: Familia;
  hermanoSeleccionado: Publicador;
  famMap: Map<string, number>;
  openDialogPublicador: BehaviorSubject<boolean>;
  modoDialogPublicador: string;
  openDialogFamilia: BehaviorSubject<boolean>;
  openDialogInfo: BehaviorSubject<boolean>;
  modoDialogFamilia: string;
  socketFamilias: any;
  socketShared:any;
  subscriptions: Subscription[] = [];
  filtroPublicadores:BehaviorSubject<any>;
  filtroTipoPublicadores:string="todos";
  filtroGrupoPublicadores:string="todos";

  constructor(private http: Http,
    private userService: LoginService, 
    private socketService:SocketService) {
      console.log(userService.getUsuarioActual());
      

      this.socketShared=io(GLOBAL.socketUrl);
    this.url = GLOBAL.url + "/publicadores";
    this.hermanosPorFamiliaS = new BehaviorSubject([]);
    this.listaHermanosPorFamiliaInicial=true;
    this.openDialogPublicador = new BehaviorSubject(false);
    this.openDialogFamilia = new BehaviorSubject(false);
    this.openDialogInfo = new BehaviorSubject(false);
    this.filtroPublicadores = new BehaviorSubject(null);
    this.filtroPublicadores.subscribe(seleccion=>{
      if(seleccion){
        this.filtroGrupoPublicadores=seleccion.grupo;
        this.filtroTipoPublicadores=seleccion.tipo;
        this.socketShared.emit('familias');
      }
    })
    this.famMap = new Map();
    // this.obtenerFamiliasConHermanos();
  }
  obtenerFamilias() {
    this.socketFamilias = io(GLOBAL.socketUrl);
    this.socketFamilias.emit('lista-familias-inicial');
    let observable = new Observable<any>(observer => {
      this.socketFamilias.on('familias', () => {
        let headers = new Headers({ 'Authorization': this.userService.getTokenActual() });
        return this.http.get(this.url + "/listaFamilias/" + this.userService.getUsuarioActual().congregacion._id, { headers })
          .map(res => {
            return res.json();
          }).subscribe(data => {
            observer.next(data);
          })
      })
      return () => {
        this.socketFamilias.disconnect();
      };
    })
    return observable;

  }

  obtenerFamiliasConHermanos() {
    this.hermanosPorFamilia = [];
    this.famMap.clear();
    this.obtenerFamilias()
      .subscribe(data => {
        if (data.familias.length>0){
          if (this.subscriptions.length > 0) {
            for (let idx in this.subscriptions) {
              this.subscriptions[idx].unsubscribe();
            }
            this.subscriptions = [];
          }
          for (let familia of data.familias) {
            //Ingresa al arreglo las familias sin integrantes 
            //para evitar que se desordenen alfabeticamente esperando obtenerlos 
            let posF = this.famMap.get(familia._id);
            if (posF == undefined) {
              let lengthAF = this.hermanosPorFamilia.push(familia);
              this.famMap.set(familia._id, lengthAF - 1);
            } else {
              this.hermanosPorFamilia[posF] = familia;
            }
          }
          for (let familia of data.familias) {
            let susc = this.obtenerHermanosFamilia(familia._id).subscribe(data => {
              familia.integrantes = data.hermanos;
              let posF = this.famMap.get(familia._id);
              this.hermanosPorFamilia[posF] = familia;
              this.listaHermanosPorFamiliaInicial=false;
              this.hermanosPorFamiliaS.next(this.hermanosPorFamilia);
            })
            this.subscriptions.push(susc);
          }
        } else{
          this.listaHermanosPorFamiliaInicial=false;
          this.hermanosPorFamiliaS.next([]);
        }
        
      })
  }

  obtenerHermanosFamilia(familia: string) {
    let socketHermanos = io(GLOBAL.socketUrl);
    socketHermanos.emit('lista-hermanos-familia-inicial', familia);
    let observable = new Observable<any>(observer => {
      socketHermanos.on('hermanos-familia', (idFamilia) => {
        if (idFamilia == familia) {
          let body=JSON.stringify({tipo:this.filtroTipoPublicadores, grupo:this.filtroGrupoPublicadores});
          let headers = new Headers({ 'Authorization': this.userService.getTokenActual()
                                      , 'Content-Type': 'application/json' });
          return this.http.post(this.url + "/listaHermanos/" + familia, body , { headers })
            .map(res => {
              return res.json();
            }).subscribe(data => {
              observer.next(data);
            })
        }
      })
      return () => {
        socketHermanos.disconnect();
      };
    })
    return observable;

  }

  existeFamilia(apellido: string) {
    let body = JSON.stringify({ apellido, congregacion: this.userService.getUsuarioActual().congregacion._id });
    let headers = new Headers({
      'Authorization': this.userService.getTokenActual(),
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/existeFamilia", body, { headers })
      .map(res => {
        return res.json();
      })
  }

  agregarFamilia(familia: Familia) {
    let body = JSON.stringify(familia);
    let headers = new Headers({
      'Authorization': this.userService.getTokenActual(),
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/agregarFamilia", body, { headers })
      .map(res => {
        return res.json();
      })
  }

  editarFamilia(familia: Familia) {
    let body = JSON.stringify(familia);
    console.log(body);
    
    let headers = new Headers({
      'Authorization': this.userService.getTokenActual(),
      'Content-Type': 'application/json'
    });
    return this.http.put(this.url + "/editarFamilia/" + familia._id, body, { headers })
      .map(res => {
        return res.json();
      })
  }

  existeIntegranteFamilia(nombre: string, familiaId: string) {
    let body = JSON.stringify({ nombre: nombre, familia: familiaId });
    let headers = new Headers({
      'Authorization': this.userService.getTokenActual(),
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/existeIntegranteFamilia", body, { headers })
      .map(res => {
        return res.json();
      })
  }

  agregarHermano(publicador: Publicador) {
    let body = JSON.stringify(publicador);
    let headers = new Headers({
      'Authorization': this.userService.getTokenActual(),
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + "/", body, { headers })
      .map(res => {
        return res.json();
      })
  }

  editarHermano(publicador: Publicador) {
    let body = JSON.stringify(publicador);
    let headers = new Headers({
      'Authorization': this.userService.getTokenActual(),
      'Content-Type': 'application/json'
    });
    return this.http.put(this.url + "/" + publicador._id, body, { headers })
      .map(res => {
        return res.json();
      })
  }
  ngOnDestroy(): void {
    for (let idx in this.subscriptions) {
      this.subscriptions[idx].unsubscribe();
    }
    this.subscriptions = [];
    this.socketShared.disconnect();
  }

}
