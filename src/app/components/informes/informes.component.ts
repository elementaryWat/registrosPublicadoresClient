import { Component, OnInit } from '@angular/core';
import { InformesService } from '../../services/informes.service';
import { PublicadoresService } from '../../services/publicadores.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(private informesService:InformesService,
      private hermanoService:PublicadoresService) { 
    informesService.obtenerInformePorHermano().subscribe(data=>{
      console.log(data);
      
    })
  }

  ngOnInit() {
  }

}
