import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: IUser;
  userEditForm: FormGroup;
  id: string;
  loader: boolean;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.userEditForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: ''}, [Validators.required, Validators.maxLength(40), Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(12)] ],
      country: ['', Validators.required]
    });

    this.loadUser();
  }

  private loadUser() {
    if (this.id == null)
      return;
    this.loader = true;
    this.userService.getUser(this.id)
      .subscribe(user => {
        this.user = user;
        this.userEditForm.get('username').setValue(user.username);
        this.userEditForm.get('email').setValue(user.email)
        this.userEditForm.get('phone').setValue(user.phone)
        this.userEditForm.get('country').setValue(user.country)

      }, () => { }, () => { this.loader = false; });
  }

  saveData(): void {
    console.log(this.userEditForm.value);
    this.userService.updateUser(this.user._id, this.userEditForm.value)
      .subscribe(user => { 
        this.user = user;
        localStorage.setItem('token', user['_kmd']['authtoken']);

      },
        () => { }, () =>  {
          this.router.navigate(['']); });
  }



}


