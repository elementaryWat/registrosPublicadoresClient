import { Usuario } from './user.interface';
import { Familia } from './familia.interface';


export interface Publicador{
    nombre:string,
    familia:Familia,
    genero:string,
    domicilio:string,
    grupo:number,
    telefono:string,
    celular:string,
    fechaNacimiento:Date,
    bautizado:boolean,
    fechaBautismo?:Date,
    ungido:boolean,
    siervoMinisterial?:boolean,
    anciano?:boolean,
    precReg:boolean,
    idPrecursor?:string,
    fechaNombramientoPrecursor?:Date
}