import { Publicador } from './../interfaces/publicador.interface';
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
    this.publicadoresService.modoDialog="add";
    this.publicadoresService.openDialog.next(true);
  }

  abrirDialogoEditarHermano(hermano:Publicador){
    this.publicadoresService.hermanoSeleccionado=hermano;
    this.publicadoresService.modoDialog="edit";
    this.publicadoresService.openDialog.next(true);
  }

}
