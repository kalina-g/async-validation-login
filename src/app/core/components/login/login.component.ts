import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('token', data['_kmd']['authtoken']);
      localStorage.setItem('_id', data['_id']);
      this.router.navigate(['']);
    })
  }


}
