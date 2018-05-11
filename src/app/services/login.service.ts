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

  verificarLoggedLocal(){
    this.usuarioActual= JSON.parse(localStorage.getItem('usuario'));
    this.tokenActual=localStorage.getItem("token");
    if(this.usuarioActual && this.tokenActual){
      this.islogged.next(true);
    }
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
    localStorage.setItem("usuario",JSON.stringify(user));
  }

  getUsuarioActual(){
    return this.usuarioActual;
  }

  setTokenActual(token:string){
    this.tokenActual=token;
    localStorage.setItem("token",token);
  }

  getTokenActual(){
    return this.tokenActual;
  }

  logOut(){
    localStorage.removeItem("usuario");  
    localStorage.removeItem("token");  
    this.usuarioActual=null;
    this.tokenActual=null;
    this.islogged.next(false);
  }

}
