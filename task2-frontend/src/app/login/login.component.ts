import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hide = true;
  private apiurl = 'http://localhost:8080/user/login';

  constructor(private router: Router, private auth: AuthService, private http: HttpClient) {}

  login() {
    const user = { username: this.username, password: this.password };

    this.http.post(this.apiurl, user,{ responseType: 'text' }).subscribe({
      next: (res) => {
        alert("Successfully loggedIn");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert("Enter valid credential")
      }
    });
  }
}
