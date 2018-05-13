import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { GLOBAL } from '../GLOBAL';


@Injectable()
export class SocketService {
  socket:any;
  constructor() { 
    this.socket = io(GLOBAL.socketUrl);    
  }

}
