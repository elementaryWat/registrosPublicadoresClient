import { Congregacion } from './congregacion.interface';
import { Publicador } from './publicador.interface';


export interface Familia{
    _id?:string,
    apellido:string,
    congregacion:Congregacion,
    integrantes?:Publicador[];
}