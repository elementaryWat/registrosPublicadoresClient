import { PublicadoresService } from './../../../services/publicadores.service';
import { Congregacion } from './../../../interfaces/congregacion.interface';
import { LoginService } from './../../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-editar-familia',
  templateUrl: './agregar-editar-familia.component.html',
  styleUrls: ['./agregar-editar-familia.component.css']
})
export class AgregarEditarFamiliaComponent implements OnInit {
  formAgregarEditarFamilia:FormGroup;
  modoComponent:string="add";
  hayErrorAdd:boolean;
  errorAdd:string;
  hayErrorUpdate:boolean;
  errorUpdate:string;
  createUpdateExitoso:boolean;
  msgExito:string;
  loading:boolean;

  constructor(private userService:LoginService,
    private publicadoresService:PublicadoresService) { 
    this.crearFormAgregarEditarFamilia();
      publicadoresService.openDialogFamilia.subscribe(opened=>{
        if(opened){
          this.modoComponent=publicadoresService.modoDialogFamilia;
        }
      })
  }

  ngOnInit() {
  }

  crearFormAgregarEditarFamilia(){
    this.formAgregarEditarFamilia=new FormGroup({
      'congregacion':new FormControl(this.userService.getUsuarioActual().congregacion._id),
      'apellido':new FormControl('',Validators.required)
    })
  }

  agregarFamilia(){
    console.log(this.formAgregarEditarFamilia);
  }

  editarFamilia(){
    console.log(this.formAgregarEditarFamilia);
    
  }

}
