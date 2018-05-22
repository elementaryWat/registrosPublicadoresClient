import { PublicadoresService } from './../../../services/publicadores.service';
import { Component, OnInit } from '@angular/core';
import { Publicador } from '../../../interfaces/publicador.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  hermanoActual:Publicador;
  constructor(private publicadoresService:PublicadoresService) { 
    publicadoresService.openDialogInfo.subscribe(opened=>{
      if(opened){
        this.hermanoActual=publicadoresService.hermanoSeleccionado;
      }
    })
  }

  ngOnInit() {
  }

}
