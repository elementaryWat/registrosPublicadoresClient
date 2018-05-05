import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class LoginService {
  islogged:BehaviorSubject<boolean>;
  constructor(private http:Http) { 
    this.islogged=new BehaviorSubject(false);
  }

}
