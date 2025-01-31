import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { User, UserListService } from '../user-list.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';  
import { MatButtonModule } from '@angular/material/button';  
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MatTableModule, MatButtonModule, MatToolbarModule, MatInputModule, FormsModule, MatIconModule, AddUserComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  list: MatTableDataSource<User>;
  displayedColumns: string[] = ['username', 'password', 'role']; 
  filterValue: any = "";
  roleBylocal:any="";
  
  

  constructor(private userlistObj: UserListService, private dialog: MatDialog, private http: HttpClient) {
    this.list = new MatTableDataSource(userlistObj.userlist);
    this.roleBylocal=localStorage.getItem('role');
  }
  
  reloadData(){
    const url = "http://localhost:8080/user";
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        const updatedList: User[] = res.map(item => ({
          id:item.id,
          username: item.username,
          password: item.password,
          role: item.role || '',
        }));
        

        this.list = new MatTableDataSource(updatedList);
        console.log(updatedList);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  ngOnInit(): void {
    this.reloadData();
    this.updateDisplayedColumns();
  }
  updateDisplayedColumns() {
    // Check role and conditionally add columns
    if (this.roleBylocal && this.roleBylocal !== 'operator') {
      // Only add 'edit' and 'delete' columns if the role is not 'operator'
      this.displayedColumns.push('edit', 'delete');
    }
  }

  

  addUser(timepass:any) {
    setTimeout(() => {
      this.reloadData(); 
  }, 2000);
    
  }

  editUser(user: User) {
    console.log('Editing user:', user);

    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        const user={
          id:result.id,
          username:result.username,
          password:result.password,
          role:result.role
        }
        console.log("latest pattern")
        console.log(result);
        const api="http://localhost:8080/user/update"
        this.http.post(api,user,{responseType:'text'}).subscribe({
          next:(res)=>{
            alert("user data has been updated")
            this.reloadData();
            console.log(res);

          },
          error:(error)=>{
            alert("internal error occured")
            console.log(error)
          }
        })
      }
    });
  }
  

  deleteUser(user:User){

    const api="http://localhost:8080/user/delete"
    this.http.post(api,user,{responseType:'text'}).subscribe({
      next:(res)=>{
        this.reloadData();
        alert("user data has been deleted")
        console.log(res);

      },
      error:(error)=>{
        alert("internal error occured")
        console.log(error)
      }
    })


  }

  applyFilter() {
    const filterValue = this.filterValue.trim().toLowerCase();
    this.list.filter = filterValue;
  }
}
