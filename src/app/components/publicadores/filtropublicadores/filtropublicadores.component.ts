import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { PublicadoresService } from '../../../services/publicadores.service';

@Component({
  selector: 'app-filtropublicadores',
  templateUrl: './filtropublicadores.component.html',
  styleUrls: ['./filtropublicadores.component.css']
})
export class FiltropublicadoresComponent implements OnInit {
  cantGrupos:number;
  grupos:number[]=[];
  formFiltroPublicadores:FormGroup;
  initialValue:any;
  cambioF:boolean;

  constructor(private userService:LoginService, 
    private publicadoresService:PublicadoresService) { 
    this.crearFormFiltroPublicadores();
    this.cantGrupos = userService.getUsuarioActual().congregacion.cantidadGrupos;
    for (let i = 1; i <= this.cantGrupos; i++) {
      this.grupos.push(i);
    }
  }

  ngOnInit() {
  }

  crearFormFiltroPublicadores(){
    this.formFiltroPublicadores=new FormGroup({
      'tipo':new FormControl('todos'),
      'grupo':new FormControl('todos')
    });
    this.formFiltroPublicadores.valueChanges.subscribe(currentValue=>{
      this.cambioF=JSON.stringify(this.initialValue)!=JSON.stringify(this.formFiltroPublicadores.value)
    })
    this.initialValue=this.formFiltroPublicadores.value;
    this.cambioF=false;
  }

  filtrar(){
    this.publicadoresService.filtroPublicadores.next(this.formFiltroPublicadores.value);
    this.initialValue=this.formFiltroPublicadores.value;
    this.cambioF=false;
  }

}
