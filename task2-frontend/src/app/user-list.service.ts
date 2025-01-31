import { Injectable } from '@angular/core';


export interface User {
  id:string;
  username: string;
  password: string;
  role: string;
}
// export class User {
//   private username: any;
//   private password: any;
//   private role: any;

//   constructor(username: any, password: any, role: any) {
//     this.username = username;
//     this.password = password;
//     this.role = role;
//   }

//   getUsername() {
//     return this.username;
//   }

//   getPassword() {
//     return this.password;
//   }

//   getRole() {
//     return this.role;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  userlist: User[] = [];

  constructor() {
    // const defaultUser: User = {
    //   username: 'parth',
    //   password: 'parth123',
    //   role: 'manager',
    // };
    // this.userlist.push(defaultUser)
  }
  

  addUser(userObj: User) {
    this.userlist.push(userObj);
  }

  getUserList() {
    return this.userlist;
  }
  
}
