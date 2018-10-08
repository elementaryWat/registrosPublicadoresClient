import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Publicador } from '../../../interfaces/publicador.interface';
import { Informe } from '../../../interfaces/informe.interface';
import { InformesService } from '../../../services/informes.service';

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
      if(opened){
        this.modoComponent=informeService.modoDialogInforme;
        if(this.modoComponent=='add'){
          this.formAgregarEditarInforme.reset({
            hermano:informeService.hermanoSeleccionado._id,
            precReg:informeService.hermanoSeleccionado.precReg,
          })
        }
      }
    })
  }

  ngOnInit() {
  }

  crearFormAddEditInforme(){
    this.formAgregarEditarInforme=new FormGroup({
      '_id':new FormControl(''),
      'hermano':new FormControl(''),
      'horas':new FormControl('',[Validators.required]),
      'publicaciones':new FormControl('',),
      'videos':new FormControl(''),
      'horas':new FormControl(''),
      'revisitas':new FormControl(''),
      'estudios':new FormControl(''),
      'precAux':new FormControl(''),
      'precReg':new FormControl(false),
    });
    this.formAgregarEditarInforme.valueChanges.subscribe(currentValue=>{
      this.hayErrorAddUpdate=false;
      this.createUpdateExitoso=false;
      this.cambioForm=JSON.stringify(currentValue)!=JSON.stringify(this.initialValue);
    }
  }

}
