import { Usuario } from './user.interface';
import { Familia } from './familia.interface';


export interface Publicador{
    _id?:string,
    nombre:string,
    familia:Familia,
    genero:string,
    domicilio:string,
    grupo:number,
    datosContacto:[{
        tipo:string,
        telefono:string,
        conWhatsApp:boolean,
        empresa:string
    }],
    fechaNacimiento:string,
    bautizado:boolean,
    fechaBautismo?:string,
    ungido:boolean,
    siervoMinisterial?:boolean,
    anciano?:boolean,
    precReg:boolean,
    idPrecursor?:string,
    fechaNombramientoPrecursor?:string
}