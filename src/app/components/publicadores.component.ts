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
  familiaClickeada:string="";
  loadingHermanos:boolean=false;
  constructor(public publicadoresService:PublicadoresService) { 
    publicadoresService.obtenerFamiliasConHermanos();
    this.loadingHermanos=true;
    publicadoresService.hermanosPorFamiliaS.subscribe(familias=>{
      this.loadingHermanos=false;
      this.familias=familias;
    })
  }

  ngAfterViewInit() {
  }

  onClickFamily(familiaId:string){
    this.familiaClickeada=familiaId;
  }

  abrirDialogoNuevoIntegrante(familia:Familia){
    this.publicadoresService.familiaSeleccionada=familia;
    this.publicadoresService.modoDialogPublicador="add";
    this.publicadoresService.openDialogPublicador.next(true);
  }

  abrirDialogoEditarHermano(hermano:Publicador){
    this.publicadoresService.hermanoSeleccionado=hermano;
    this.publicadoresService.modoDialogPublicador="edit";
    this.publicadoresService.openDialogPublicador.next(true);
  }

  abrirDialogoNuevaFamilia(){
    this.publicadoresService.modoDialogFamilia="add";
    this.publicadoresService.openDialogFamilia.next(true);
  }
  abrirDialogoEditarFamilia(familia:Familia){
    this.publicadoresService.familiaSeleccionada=familia;
    this.publicadoresService.modoDialogFamilia="edit";
    this.publicadoresService.openDialogFamilia.next(true);
  }

}
