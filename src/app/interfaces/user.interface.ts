import { Congregacion } from './congregacion.interface';

export interface Usuario{
    email:string,
    password:string,
    role:string,
    grupo:number,
    congregacion:Congregacion
}