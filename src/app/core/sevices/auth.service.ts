import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials):Observable<Object> {
    return this.http.post('/user/kid_ry7kDWD0E/login', credentials, {params:{"isBasic":"1"} } );
  }


}
