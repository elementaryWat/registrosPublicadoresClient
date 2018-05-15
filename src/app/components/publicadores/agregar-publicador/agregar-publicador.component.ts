import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { PublicadoresService } from '../../../services/publicadores.service';
import { Familia } from '../../../interfaces/familia.interface';
import { Publicador } from '../../../interfaces/publicador.interface';
import { LoginService } from '../../../services/login.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-agregaryeditar-publicador',
  templateUrl: './agregar-publicador.component.html',
  styleUrls: ['./agregar-publicador.component.css']
})
export class AgregarPublicadorComponent implements OnInit {
  formAgregarHermano: FormGroup;
  hermanoToAdd: Publicador;
  hayErrorAdd: boolean;
  familiaSeleccionada: Familia;
  hermanoSeleccionado: Publicador;
  errorAdd;
  addHermanoExitoso: boolean = false;
  mensajeExito: string = "";
  loading: boolean = false;
  familias: Familia[];
  cantGrupos: number;
  grupos: any[] = [];
  modoComponent: string = "add";
  socket: any;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy'
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };


  constructor(private publicadorService: PublicadoresService,
    private userService: LoginService,
    private socketService: SocketService) {
    this.socket = socketService.socket;
    this.crearFormAgregarHermano();
    this.cantGrupos = userService.getUsuarioActual().congregacion.cantidadGrupos;
    for (let i = 1; i <= this.cantGrupos; i++) {
      this.grupos.push(i);
    }
    publicadorService.obtenerFamilias().subscribe(data => {
      this.familias = data.familias;
      publicadorService.openDialog.subscribe(opened => {
        if (opened) {
          this.formAgregarHermano.setControl('datosContacto', new FormArray([
            new FormGroup({
              'tipo': new FormControl('fijo'),
              'telefono': new FormControl('', Validators.required),
              'conWhatsApp': new FormControl(false),
              'empresa': new FormControl('C')
            })
          ]))
          this.modoComponent = publicadorService.modoDialog;
          if (this.modoComponent == "add") {
            this.familiaSeleccionada = publicadorService.familiaSeleccionada;
            this.formAgregarHermano.reset({
              nombre: '',
              familia: this.familiaSeleccionada._id,
              genero: 'M',
              domicilio: '',
              grupo: 1,
              datosContacto: [{
                tipo: 'fijo',
                telefono: null,
                empresa: 'C',
                conWhatsApp: false
              }],
              fechaNacimiento: '',
              bautizado: false,
              fechaBautismo: '',
              ungido: false,
              siervoMinisterial: false,
              anciano: false,
              precReg: false,
              idPrecursor: '',
              fechaNombramientoPrecursor: ''
            });
          } else if (this.modoComponent == "edit") {
            this.hermanoSeleccionado = publicadorService.hermanoSeleccionado;
            this.formAgregarHermano.setControl('datosContacto', new FormArray([
              new FormGroup({
                'tipo': new FormControl('fijo'),
                'telefono': new FormControl('', Validators.required),
                'conWhatsApp': new FormControl(false),
                'empresa': new FormControl('C')
              })
            ]));
            for (let i = 0; i < (this.hermanoSeleccionado.datosContacto.length - 1); i++) {
              (<FormArray>this.formAgregarHermano.controls['datosContacto']).push(new FormGroup({
                'tipo': new FormControl('celular'),
                'telefono': new FormControl('', Validators.required),
                'conWhatsApp': new FormControl(true),
                'empresa': new FormControl('C')
              }));
            }
            this.formAgregarHermano.reset(this.hermanoSeleccionado);
            this.setearFechas();
          }
        }
      })
    })

  }

  ngOnInit() {
  }

  setearFechas() {
    let fechaNacimiento = this.hermanoSeleccionado.fechaNacimiento;
    if (fechaNacimiento != undefined && fechaNacimiento != null && fechaNacimiento != '') {
      let fechaNacimientoF = new Date(fechaNacimiento);
      this.formAgregarHermano.patchValue(
        {
          fechaNacimientoF: {
            date: {
              year: fechaNacimientoF.getFullYear(),
              month: fechaNacimientoF.getMonth() + 1,
              day: fechaNacimientoF.getDate()
            }
          }
        }
      );
    }
    let fechaBautismo = this.hermanoSeleccionado.fechaBautismo;
    if (fechaBautismo != undefined && fechaBautismo != null && fechaBautismo != '') {
      let fechaBautismoF = new Date(fechaBautismo);
      this.formAgregarHermano.patchValue(
        {
          fechaBautismoF: {
            date: {
              year: fechaBautismoF.getFullYear(),
              month: fechaBautismoF.getMonth() + 1,
              day: fechaBautismoF.getDate()
            }
          }
        }
      );
    }
    let fechaNombramientoPrecursor = this.hermanoSeleccionado.fechaNombramientoPrecursor;
    if (fechaNombramientoPrecursor != undefined && fechaNombramientoPrecursor != null && fechaNombramientoPrecursor != '') {
      let fechaNombramientoPrecursorF = new Date(fechaNombramientoPrecursor);
      this.formAgregarHermano.patchValue(
        {
          fechaNombramientoPrecursorF: {
            date: {
              year: fechaNombramientoPrecursorF.getFullYear(),
              month: fechaNombramientoPrecursorF.getMonth() + 1,
              day: fechaNombramientoPrecursorF.getDate()
            }
          }
        }
      );
    }
  }

  crearFormAgregarHermano() {
    this.formAgregarHermano = new FormGroup({
      '_id': new FormControl(''),
      'nombre': new FormControl('', Validators.required),
      'familia': new FormControl('', Validators.required),
      'genero': new FormControl('', Validators.required),
      'domicilio': new FormControl('', Validators.required),
      'grupo': new FormControl('', Validators.required),
      'datosContacto': new FormArray([
        new FormGroup({
          'tipo': new FormControl('fijo'),
          'telefono': new FormControl('', Validators.required),
          'conWhatsApp': new FormControl(false),
          'empresa': new FormControl('C')
        })
      ]),
      'fechaNacimientoF': new FormControl(null, Validators.required),
      'fechaNacimiento': new FormControl(null, Validators.required),
      'bautizado': new FormControl('', Validators.required),
      'fechaBautismoF': new FormControl(null),
      'fechaBautismo': new FormControl(null),
      'ungido': new FormControl(false),
      'siervoMinisterial': new FormControl(false),
      'anciano': new FormControl(false),
      'precReg': new FormControl(false),
      'idPrecursor': new FormControl(''),
      'fechaNombramientoPrecursorF': new FormControl(''),
      'fechaNombramientoPrecursor': new FormControl('')
    });
    this.formAgregarHermano.valueChanges.subscribe(currentValue => {
      this.hayErrorAdd = false;
      this.addHermanoExitoso = false;
    })
    this.formAgregarHermano.controls['bautizado'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        this.formAgregarHermano.controls['fechaBautismo'].setValidators([Validators.required]);
      } else {
        this.formAgregarHermano.controls['fechaBautismo'].clearValidators();
        this.formAgregarHermano.controls['fechaBautismo'].reset();
        this.formAgregarHermano.controls['idPrecursor'].clearValidators();
        this.formAgregarHermano.controls['idPrecursor'].reset();
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].clearValidators();
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].reset();
      }
    })
    this.formAgregarHermano.controls['precReg'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        this.formAgregarHermano.controls['idPrecursor'].setValidators([Validators.required]);
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].setValidators([Validators.required]);
      } else {
        this.formAgregarHermano.controls['idPrecursor'].clearValidators();
        this.formAgregarHermano.controls['idPrecursor'].reset();
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].clearValidators();
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].reset();
      }
    })
    this.formAgregarHermano.controls['fechaBautismoF'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        let fechaFormateada = `${currentValue.date.year}/${currentValue.date.month}/${currentValue.date.day}`;
        this.formAgregarHermano.controls['fechaBautismo'].setValue(fechaFormateada);
      }
    })
    this.formAgregarHermano.controls['fechaNacimientoF'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        let fechaFormateada = `${currentValue.date.year}/${currentValue.date.month}/${currentValue.date.day}`;
        this.formAgregarHermano.controls['fechaNacimiento'].setValue(fechaFormateada);
      }
    })
    this.formAgregarHermano.controls['fechaNombramientoPrecursorF'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        let fechaFormateada = `${currentValue.date.year}/${currentValue.date.month}/${currentValue.date.day}`;
        this.formAgregarHermano.controls['fechaNombramientoPrecursor'].setValue(fechaFormateada);
      }
    })
    this.formAgregarHermano.controls['genero'].valueChanges.subscribe(currentValue => {
      if (currentValue == "F") {
        this.formAgregarHermano.controls['siervoMinisterial'].setValue(false);
        this.formAgregarHermano.controls['anciano'].setValue(false);
      }
    })
    this.formAgregarHermano.controls['siervoMinisterial'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        this.formAgregarHermano.controls['anciano'].setValue(false);
      }
    })
    this.formAgregarHermano.controls['anciano'].valueChanges.subscribe(currentValue => {
      if (currentValue) {
        this.formAgregarHermano.controls['siervoMinisterial'].setValue(false);
      }
    })
  }

  agregarTelefono() {
    let lenghtA=(<FormArray>this.formAgregarHermano.controls['datosContacto']).length;
    (<FormArray>this.formAgregarHermano.controls['datosContacto']).push(new FormGroup({
      'tipo': new FormControl('celular'),
      'telefono': new FormControl('', Validators.required),
      'conWhatsApp': new FormControl(true),
      'empresa': new FormControl('C')
    }));
    var position = $('#phone'+(lenghtA-1)).position();
    
    // scroll modal to position top
    $("#addandEditPublicadorModal").scrollTop(position.top+450);
  }
  eliminarTelefono(idx: number) {
    (<FormArray>this.formAgregarHermano.controls['datosContacto']).removeAt(idx);
  }

  agregarHermano() {
    this.loading = true;
    this.hermanoToAdd = this.formAgregarHermano.value;
    this.publicadorService.agregarHermano(this.hermanoToAdd).subscribe(data => {
      this.loading = false;
      this.addHermanoExitoso = true;
      this.mensajeExito = "Se ha agregado al hermano de manera exitosa";
      this.socket.emit('hermanos-familia', this.hermanoToAdd.familia);
    }, error => {
      this.loading = false;
      this.hayErrorAdd = true;
      this.errorAdd = "Ocurrio un error al agregar al hermano";
      console.log(error);
    })
  }

  editarHermano() {
    this.loading = true;
    this.hermanoToAdd = this.formAgregarHermano.value;
    this.publicadorService.editarHermano(this.hermanoToAdd).subscribe(data => {
      this.loading = false;
      this.addHermanoExitoso = true;
      this.mensajeExito = `Se han actualizado los datos de ${this.formAgregarHermano.value.nombre} de manera exitosa`;
      this.socket.emit('hermanos-familia', this.hermanoToAdd.familia);
    }, error => {
      this.loading = false;
      this.hayErrorAdd = true;
      this.errorAdd = "Ocurrio un error al agregar al hermano";
      console.log(error);
    })
  }
}
