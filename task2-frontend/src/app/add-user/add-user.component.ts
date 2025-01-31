import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { User } from '../user-list.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User 
  ) {}

  ngOnInit(): void {
    // Initialize the form with the data or default values
    this.addUserForm = this.fb.group(
      {
        id:[this.data?.id|| ''],
        username: [this.data?.username || '', Validators.required],
        password: [this.data?.password || '', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [this.data?.password || '', [Validators.required, Validators.minLength(8)]],
        role: [this.data?.role || '', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }



  onSubmit(): void {
    if (this.addUserForm.valid) {
      const updatedUser = this.addUserForm.value;
      console.log('Updated User:', updatedUser);
      this.dialogRef.close(updatedUser);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    let ans=password === confirmPassword ? null : { mismatch: true };
    return ans;
  }
}
