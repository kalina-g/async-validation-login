import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  getUserId(){
    return localStorage.getItem('_id');
  }

  isAuthenticated() {

    return (localStorage.getItem('_id') !== null) ? true : false
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigate(['']);
  }


}
