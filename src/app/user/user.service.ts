import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Address } from './models/address.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form, FormBuilder, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  getList(): Observable<User>{
    const userData = this.http.get('./../assets/user.json')
    return userData as  Observable<User>;
  }
}
