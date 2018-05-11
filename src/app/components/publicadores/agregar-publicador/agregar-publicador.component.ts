import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { PublicadoresService } from '../../../services/publicadores.service';
import { Familia } from '../../../interfaces/familia.interface';

@Component({
  selector: 'app-agregar-publicador',
  templateUrl: './agregar-publicador.component.html',
  styleUrls: ['./agregar-publicador.component.css']
})
export class AgregarPublicadorComponent implements OnInit {
  formAgregarHermano: FormGroup;
  hayErrorAdd: boolean;
  familiaSeleccionada:Familia;
  errorAdd;
  loading: boolean = false;
  familias:Familia[];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy'
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };


  constructor(private publicadorService:PublicadoresService) {
    this.crearFormAgregarHermano();
    publicadorService.obtenerFamilias().subscribe(data=>{
      this.familias=data.familias;
    })
    publicadorService.openDialog.subscribe(opened=>{
      this.familiaSeleccionada=publicadorService.familiaSeleccionada;
      
      if(opened){
        this.formAgregarHermano.reset({
          nombre:'',
          familia:this.familiaSeleccionada._id,
          genero:'M',
          domicilio:'',
          grupo:1,
          telefono:'',
          celular:'',
          fechaNacimiento:'',
          bautizado:false,
          fechaBautismo:'',
          ungido:false,
          siervoMinisterial:false,
          anciano:false,
          precReg:false,
          idPrecursor:'',
          fechaNombramientoPrecursor:''
        });
      }
    })

  }

  ngOnInit() {
  }

  crearFormAgregarHermano() {
    this.formAgregarHermano = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'familia': new FormControl('', Validators.required),
      'genero': new FormControl('', Validators.required),
      'domicilio': new FormControl('', Validators.required),
      'grupo': new FormControl('', Validators.required),
      'telefono': new FormControl(''),
      'celular': new FormControl(''),
      'fechaNacimiento': new FormControl(null, Validators.required),
      'bautizado': new FormControl('', Validators.required),
      'fechaBautismo': new FormControl(null),
      'ungido': new FormControl(false),
      'siervoMinisterial': new FormControl(false),
      'anciano': new FormControl(false),
      'precReg': new FormControl(false),
      'idPrecursor': new FormControl(''),
      'fechaNombramientoPrecursor': new FormControl(''),      
    });
    this.formAgregarHermano.valueChanges.subscribe(currentValue => {
      this.hayErrorAdd = false;
    })
    this.formAgregarHermano.controls['bautizado'].valueChanges.subscribe(currentValue=>{
      if(currentValue){
        this.formAgregarHermano.controls['fechaBautismo'].setValidators([Validators.required]);
      }else{
        this.formAgregarHermano.controls['fechaBautismo'].clearValidators(); 
        this.formAgregarHermano.controls['fechaBautismo'].reset();
        this.formAgregarHermano.controls['idPrecursor'].clearValidators();        
        this.formAgregarHermano.controls['idPrecursor'].reset();        
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].clearValidators();        
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].reset();    
      }
    })
    this.formAgregarHermano.controls['precReg'].valueChanges.subscribe(currentValue=>{
      if(currentValue){
        this.formAgregarHermano.controls['idPrecursor'].setValidators([Validators.required]);
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].setValidators([Validators.required]);
      }else{
        this.formAgregarHermano.controls['idPrecursor'].clearValidators();        
        this.formAgregarHermano.controls['idPrecursor'].reset();        
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].clearValidators();        
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].reset();        
      }
    })
  }

  agregarHermano() {
    console.log(this.formAgregarHermano);
    
  }
}
