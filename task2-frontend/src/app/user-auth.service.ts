import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class UserAuthService {

  private loginname:string="";

  constructor() { }

  setLoginName(name:string){
    this.loginname=name;
    console.log(this.loginname);
  }

  getName(){
    console.log(this.loginname);
    return this.loginname;
  }

}
