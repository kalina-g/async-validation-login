import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/user/models/user';
import { map, delay } from 'rxjs/operators';


function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  entity: IUser;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }



  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(40)], this.checkNameExists.bind(this)],
      email: ['', [Validators.required, Validators.maxLength(40), Validators.email], this.checkEmailExists.bind(this)],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      }, { validator: passwordMatcher }),
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      country: ['', Validators.required]
    });

  }

  checkNameExists(c: AbstractControl) {
    return this.userService.checkNameExists(c.value).pipe(
    delay(500),
    map(res => {
      return (res.length>0) ?  { 'nameTaken': true } :null;
    }));
  }

  checkEmailExists(c: AbstractControl) {
    return this.userService.checkEmailExists(c.value).pipe(
    delay(500),
    map(res => {
      return (res.length>0) ?  { 'emailTaken': true } :null;
    }));
  }

  onSubmit() {
    this.entity = this.registerForm.value;
    this.entity.password = this.registerForm.get('passwordGroup.password').value;
    this.userService.addUser(this.entity).subscribe(data => {

      this.router.navigate(['']);
    })
  }



}
