import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Publicador } from '../../../interfaces/publicador.interface';
import { Informe } from '../../../interfaces/informe.interface';
import { InformesService } from '../../../services/informes.service';

import * as _ from 'lodash';

@Component({
  selector: 'modal-agregar-editar-informe',
  templateUrl: './agregar-editar-informe.component.html',
  styleUrls: ['./agregar-editar.component.css']
})
export class AgregarEditarInformeComponent implements OnInit {

  formAgregarEditarInforme:FormGroup;

  modoComponent:string="add";
  hayErrorAddUpdate:boolean;
  errorAddUpdate:string;
  createUpdateExitoso:boolean;
  msgExito:string;
  loading:boolean;
  publicadorSeleccionado:Publicador;
  initialValue:Informe;
  cambioForm:boolean;

  constructor(private informeService:InformesService) { 
    this.crearFormAddEditInforme();
    informeService.openDialogInforme.subscribe(opened=>{
      this.publicadorSeleccionado=informeService.hermanoSeleccionado;
      console.log(this.publicadorSeleccionado);
      
      if(opened){
        this.modoComponent=informeService.modoDialogInforme;
        if(this.modoComponent=='add'){
          this.formAgregarEditarInforme.reset({
            hermano:this.publicadorSeleccionado._id,
            precReg:this.publicadorSeleccionado.precReg,
            precAux:false
          })
        }else if(this.modoComponent=='edit'){
          this.formAgregarEditarInforme.reset(informeService.informeSeleccionado);
          this.initialValue=this.formAgregarEditarInforme.value;  
          this.cambioForm=false; 
        }
      }
    })
  }

  ngOnInit() {
  }

  crearFormAddEditInforme(){
    this.formAgregarEditarInforme=new FormGroup({
      '_id':new FormControl(null),
      'hermano':new FormControl(null),
      'horas':new FormControl(null,[Validators.required,Validators.min(1)]),
      'publicaciones':new FormControl(null,Validators.min(0)),
      'videos':new FormControl(null,Validators.min(0)),
      'revisitas':new FormControl(null,Validators.min(0)),
      'estudios':new FormControl(null,Validators.min(0)),
      'precAux':new FormControl(false),
      'precReg':new FormControl(false),
    });
    this.formAgregarEditarInforme.valueChanges.subscribe(currentValue=>{
      this.hayErrorAddUpdate=false;
      this.createUpdateExitoso=false;
      this.cambioForm=JSON.stringify(currentValue)!=JSON.stringify(this.initialValue);
    })
  }

  agregarInforme(){
    this.loading = true;
    let newInforme=this.formAgregarEditarInforme.value;
    _.assign(newInforme,{
      publicaciones:((newInforme.publicaciones)?newInforme.publicaciones:0),
      videos:((newInforme.videos)?newInforme.videos:0),
      revisitas:((newInforme.revisitas)?newInforme.revisitas:0),
      estudios:((newInforme.estudios)?newInforme.estudios:0),
    });
    console.log(newInforme);
    
    
    this.informeService.agregarInforme(newInforme).then(data => {
      this.loading = false;
      this.createUpdateExitoso = true;
      this.msgExito = "Se ha agregado el informe correctamente";
    }, error => {
      this.loading = false;
      this.hayErrorAddUpdate = true;
      this.errorAddUpdate = "Ocurrio un error al intentar agregar el informe";
      console.log(error);
    })
  }

  editarInforme(){
    console.log(this.formAgregarEditarInforme.value);
  }
}
