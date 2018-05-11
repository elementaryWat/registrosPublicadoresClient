import { Familia } from './../interfaces/familia.interface';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'jquery-ui';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/accordion';
import { PublicadoresService } from '../services/publicadores.service';


@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.component.html',
  styleUrls: ['./publicadores.component.css']
})
export class PublicadoresComponent implements AfterViewInit {
  familias:Familia[];
  constructor(public publicadoresService:PublicadoresService) { 
    publicadoresService.obtenerFamiliasConHermanos();
    publicadoresService.hermanosPorFamiliaS.subscribe(familias=>{
      this.familias=familias;
    })
  }

  ngAfterViewInit() {
  }

  abrirDialogoNuevoIntegrante(familia:Familia){
    this.publicadoresService.familiaSeleccionada=familia;
    this.publicadoresService.openDialog.next(true);
  }

}
