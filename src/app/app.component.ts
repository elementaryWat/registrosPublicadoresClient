import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, Route } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged:boolean=false;
  constructor(private loginService:LoginService,
    private router:Router){
    loginService.islogged.subscribe(logged=>{
      this.logged=logged;
      if(!logged){
        router.navigate(['/login'])
      }
    })
  }
}
