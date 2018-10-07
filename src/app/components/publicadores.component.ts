import { Publicador } from './../interfaces/publicador.interface';
import { Familia } from './../interfaces/familia.interface';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import 'jquery-ui';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/accordion';
import { PublicadoresService } from '../services/publicadores.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.component.html',
  styleUrls: ['./publicadores.component.css']
})
export class PublicadoresComponent implements AfterViewInit, OnDestroy {
  familias:Familia[];
  familiaClickeada:string="";
  loadingHermanos:boolean=false;
  filtroP:any;
  suscripcionHermanos:Subscription;
  constructor(public publicadoresService:PublicadoresService) { 
    publicadoresService.filtroPublicadores.subscribe((filtro)=>{
      this.loadingHermanos=true;
      this.filtroP=filtro;
    })
    this.suscripcionHermanos=publicadoresService.hermanosPorFamiliaS.subscribe(familias=>{
      if(!publicadoresService.listaHermanosPorFamiliaInicial){
        this.loadingHermanos=false;
      }
      let familiasTemp=familias;
      if(this.filtroP && (this.filtroP.tipo!="todos" || this.filtroP.grupo!="todos")){
        familiasTemp=[];
        for (let familia of familias){
          if(familia.integrantes && familia.integrantes.length!=0){
            familiasTemp.push(familia);
          }
        }
      }
      this.familias=familiasTemp;
    })
  }

  ngAfterViewInit() {
  }

  onClickFamily(familiaId:string){
    this.familiaClickeada=familiaId;
  }
  abrirDialogoInfoPublicador(hermano:Publicador){
    this.publicadoresService.hermanoSeleccionado=hermano;
    this.publicadoresService.openDialogInfo.next(true);
    
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
  
  ngOnDestroy(): void {
    this.suscripcionHermanos.unsubscribe();
  }

}
