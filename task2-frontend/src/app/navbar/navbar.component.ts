import { Component,EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { User,UserListService } from '../user-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  outputs:['onAddUser']
})
export class NavbarComponent {
  onAddUser = new EventEmitter<User[]>(); 
  timepass:any="yes";

  username: any = '';

  constructor(private dialog: MatDialog, private userlistobj: UserListService,private http:HttpClient) {
    this.username = localStorage.getItem('username');
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('User added:', result);
        
        // const userObj: User = {
        //   id:this.userlistobj.userlist.length+1,
        //   username: result.username,
        //   password: result.password,
        //   role: result.role,
        // };
        const user={
          username:result.username,
          password:result.password,
          role:result.role
        }
        const api="http://localhost:8080/user"
        this.http.post(api,user,{responseType:'text'}).subscribe({
          next:(res)=>{
            alert("user added successfully")
          },
          error:(err)=>{
            alert("please fill the data correctly")
          }
        })
        // this.userlistobj.addUser(userObj);
        // console.log("before")
        // console.log(this.userlistobj.userlist) 
        this.onAddUser.emit(this.timepass);

      }
    });
  }
}

