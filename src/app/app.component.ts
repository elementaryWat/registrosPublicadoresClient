import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, Route } from '@angular/router';
import { PublicadoresService } from './services/publicadores.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged:boolean=false;
  constructor(private loginService:LoginService,
    private hermanoService:PublicadoresService,
    private router:Router){
    loginService.islogged.subscribe(logged=>{
      this.logged=logged;
      if(!logged){
        router.navigate(['/login']);
        //Vacia la lista de Hermanos al desloguarse
        hermanoService.hermanosPorFamiliaS.next([]);
        hermanoService.listaHermanosPorFamiliaInicial=true;
      }else{
        //Llena la lista de hermanos al loguearse
        hermanoService.obtenerFamiliasConHermanos();
      }
    })
  }
}
