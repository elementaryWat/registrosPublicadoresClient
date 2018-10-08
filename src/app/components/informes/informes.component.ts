import { Component, OnInit } from '@angular/core';
import { InformesService } from '../../services/informes.service';
import { PublicadoresService } from '../../services/publicadores.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  hermanosConInformesPorFamilia:any[]=[];

  constructor(private informesService:InformesService,
      private hermanoService:PublicadoresService) { 
    informesService.obtenerInformePorHermano().subscribe(data=>{
      this.hermanosConInformesPorFamilia=data;
      console.log(this.hermanosConInformesPorFamilia);
      
    })
  }

  ngOnInit() {
  }

}
