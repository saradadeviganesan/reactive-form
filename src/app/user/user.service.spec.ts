import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UserService } from './user.service';
import { inject } from '@angular/core';
import { User } from './models/user.model';


const http = {
  get: jest.fn()
};

describe('User Service', () => {
  let service: UserService;
  const mockUser = {
    "fullName":"Mike",
    "address":{
      "areaName":"Wellsmere Rd",
      "cityName":"Boston",
      "countryName":"USA"
    },
    "hobbies":[
      {
        "name":"Football"
      }
    ]  
  };
  beforeEach(() => {
    service = new UserService(http as any)
  })

  it('should return user data', () => {
    http.get.mockImplementationOnce(() => of(mockUser));
    service.getList().subscribe(user => {
      expect(http.get).toBeCalledWith('http://localhost:4200/assets/user.json');
      expect(user).toBe(Object);
      expect(user.hobbies.length).toBe(1);
    })
  })
})