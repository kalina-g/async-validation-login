import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>('/user/kid_ry7kDWD0E/' + id );
  }

  addUser(entity: IUser): Observable<IUser> {
    return this.http.post<IUser>('/user/kid_ry7kDWD0E/', entity, {params:{"isBasic":"1"} });
  }

  updateUser(id:string, entity: IUser): Observable<IUser> {
    return this.http.put<IUser>('/user/kid_ry7kDWD0E/' + id ,entity);
  }

  checkNameExists(name:string): Observable<IUser[]> {
    return this.http.get<IUser[]>('/user/kid_ry7kDWD0E?query={"username":"' + name + '"}',{params:{"isMaster":"1"} });
  }


  checkEmailExists(name:string): Observable<IUser[]> {
    return this.http.get<IUser[]>('/user/kid_ry7kDWD0E?query={"email":"' + name + '"}',{params:{"isMaster":"1"} });
  }



 
}
