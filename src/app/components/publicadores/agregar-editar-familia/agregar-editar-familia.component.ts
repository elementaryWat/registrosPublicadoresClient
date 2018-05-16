import { Familia } from './../../../interfaces/familia.interface';
import { PublicadoresService } from './../../../services/publicadores.service';
import { Congregacion } from './../../../interfaces/congregacion.interface';
import { LoginService } from './../../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-agregar-editar-familia',
  templateUrl: './agregar-editar-familia.component.html',
  styleUrls: ['./agregar-editar-familia.component.css']
})
export class AgregarEditarFamiliaComponent implements OnInit {
  formAgregarEditarFamilia:FormGroup;
  familiaSeleccionada:Familia;
  modoComponent:string="add";
  hayErrorAddUpdate:boolean;
  errorAddUpdate:string;
  createUpdateExitoso:boolean;
  msgExito:string;
  loading:boolean;
  congregacionActual:string;
  initialValue:string;
  cambioForm:boolean;
  socket:any;

  constructor(private userService:LoginService,
    private publicadoresService:PublicadoresService,
    private socketService: SocketService) { 
    this.socket=socketService.socket;
    this.crearFormAgregarEditarFamilia();
    this.congregacionActual=this.userService.getUsuarioActual().congregacion._id;
      publicadoresService.openDialogFamilia.subscribe(opened=>{
        if(opened){
          this.modoComponent=publicadoresService.modoDialogFamilia;
          if(this.modoComponent=='add'){
            this.formAgregarEditarFamilia.reset({
              apellido:'',
              congregacion:this.congregacionActual
            })
          }else if(this.modoComponent=='edit'){
            this.formAgregarEditarFamilia.reset({
              _id:publicadoresService.familiaSeleccionada._id,
              apellido:publicadoresService.familiaSeleccionada.apellido,
              congregacion:this.congregacionActual
            })
            this.initialValue=JSON.stringify(this.formAgregarEditarFamilia.value);  
            this.cambioForm=false; 
          }
        }
      })
  }

  ngOnInit() {
  }

  crearFormAgregarEditarFamilia(){
    this.formAgregarEditarFamilia=new FormGroup({
      '_id':new FormControl(''),
      'congregacion':new FormControl(this.userService.getUsuarioActual().congregacion._id),
      'apellido':new FormControl('',[Validators.required])
    });
    this.formAgregarEditarFamilia.controls['apellido'].setAsyncValidators(this.existeFamilia.bind(this))
    this.formAgregarEditarFamilia.valueChanges.subscribe(currentValue=>{
      this.hayErrorAddUpdate=false;
      this.createUpdateExitoso=false;
      this.cambioForm=JSON.stringify(currentValue)!=this.initialValue;
    })
  }

  agregarFamilia(){
    this.publicadoresService.agregarFamilia(this.formAgregarEditarFamilia.value).subscribe(data=>{
      this.createUpdateExitoso=true;
      this.msgExito="Se ha agregado la familia correctamente";
      this.formAgregarEditarFamilia.reset({
        apellido:'',
        congregacion:this.congregacionActual
      });
      this.socket.emit('familias');
    },error=>{
      this.hayErrorAddUpdate=true;
      this.errorAddUpdate="Ocurrio un error al intentar agregar la familia";
      console.log(error);
    })
  }

  editarFamilia(){
    this.publicadoresService.editarFamilia(this.formAgregarEditarFamilia.value).subscribe(data=>{
      this.createUpdateExitoso=true;
      this.msgExito="Se ha actualizado el apellido de la familia correctamente";
      this.socket.emit('lista-familias-updated');
      this.initialValue=JSON.stringify(this.formAgregarEditarFamilia.value);  
      this.cambioForm=false; 
    },error=>{
      this.hayErrorAddUpdate=true;
      this.errorAddUpdate="Ocurrio un error al intentar actualizar la familia";
      console.log(error);
    })
  }

  existeFamilia(control:FormControl){
    let promiseFamilia=new Promise((resolve,reject)=>{
      this.publicadoresService.existeFamilia(control.value).subscribe(data=>{
        if(data.founded){
          resolve({existeFamilia:true})
        }else{
          resolve(null);
        }
      })
    })
    return promiseFamilia;
  }

}
