import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from './login.service';
import { SocketService } from './socket.service';
import { GLOBAL } from '../GLOBAL';

@Injectable()
export class InformesService {
  headersGet:Headers;
  headersPost:Headers;
  url:string;

  constructor(private http: Http,
    private userService: LoginService, 
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

}
