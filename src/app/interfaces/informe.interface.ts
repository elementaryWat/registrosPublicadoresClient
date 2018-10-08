import { Publicador } from './publicador.interface';


export interface Informe{
    _id?:string,
    month:number,
    year:number,
    hermano:Publicador,
    publicaciones:number,
    videos:number,
    horas:number,
    revisitas:number,
    estudios:number,
    notas:number,
    precReg:boolean,
    precAux:boolean;
}