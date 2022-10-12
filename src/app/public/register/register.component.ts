import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  regError: any;
  regSuccess: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    this.http.post('http://localhost:8000/register', formData).subscribe(
      (result) => {
        // console.log(result);
      },
      (err) => {
        if (err.status === 400) {
          console.log(err), (this.regError = err);
        } else {
          this.regSuccess = true;
        }
      }
    );
  }
}
