import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { Component } from '@angular/core';

@Component(({
  selector:'app-user-registration',
  template: '<div></div>'
}))
class UserComponent {};

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, UserComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
