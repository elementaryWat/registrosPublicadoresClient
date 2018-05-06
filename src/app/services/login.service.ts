import { Usuario } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../GLOBAL';



@Injectable()
export class LoginService {
  usuarioActual:Usuario;
  tokenActual:string;
  islogged:BehaviorSubject<boolean>;
  constructor(private http:Http) { 
    this.islogged=new BehaviorSubject(false);
  }
  
  login(email:string, password:string){
    let body=JSON.stringify({email,password});
    let url=GLOBAL.url+"/api/users/login";
    var headers=new Headers({'Content-Type':'application/json'});
    return this.http.post(url,body,{headers}).map(res=>{
      return res.json();
    })
  }

  setUsuarioActual(user:Usuario){
    this.usuarioActual=user;
  }
  setTokenActual(token:string){
    this.tokenActual=token;
  }
}
