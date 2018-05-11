import { Familia } from './../interfaces/familia.interface';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GLOBAL } from '../GLOBAL';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PublicadoresService {
  url:string;
  hermanosPorFamilia:Familia[];
  hermanosPorFamiliaS:BehaviorSubject<Familia[]>;
  familiaSeleccionada:Familia;
  famMap:Map<string,number>;
  openDialog:BehaviorSubject<boolean>;

  constructor(private http:Http,
    private loginService:LoginService) {
    this.url=GLOBAL.url+"/api/publicadores";
    this.hermanosPorFamiliaS=new BehaviorSubject([]);
    this.openDialog=new BehaviorSubject(false);
    this.famMap=new Map();
  }
  obtenerFamilias(){
    let headers=new Headers({'Authorization':this.loginService.getTokenActual()});
    return this.http.get(this.url+"/listaFamilias/"+this.loginService.getUsuarioActual().congregacion, {headers})
      .map(res=>{
        return res.json();
      })
  }

  obtenerFamiliasConHermanos(){
    this.hermanosPorFamilia=[];
    this.famMap.clear();
    let headers=new Headers({'Authorization':this.loginService.getTokenActual()});
    return this.http.get(this.url+"/listaFamilias/"+this.loginService.getUsuarioActual().congregacion, {headers})
      .map(res=>{
        return res.json();
      })
      .subscribe(data=>{
        for(let familia of data.familias){
          this.obtenerHermanosFamilia(familia._id).subscribe(data=>{
            familia.integrantes=data.hermanos;
            let posF=this.famMap.get(familia._id);
            if(posF==undefined){
              let lengthAF=this.hermanosPorFamilia.push(familia);
              this.famMap.set(familia._id,lengthAF-1);
            }else{
              this.hermanosPorFamilia[posF].integrantes=familia.integrantes;
            }
            this.hermanosPorFamiliaS.next(this.hermanosPorFamilia);
          })
        }
      })
  }

  obtenerHermanosFamilia(familia:string){
    let headers=new Headers({'Authorization':this.loginService.getTokenActual()});
    return this.http.get(this.url+"/listaHermanos/"+familia, {headers})
      .map(res=>{
        return res.json();
      })
  }

}
