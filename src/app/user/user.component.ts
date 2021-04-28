import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { User } from './models/user.model';
import { Address } from './models/address.model';
import { UserService} from './user.service';
import { MatchValidator} from './matchValidator';
;

@Component({
  selector: 'app-user-registration',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  userForm: FormGroup;
  userDetails= <User>{};
  userAddress: String ='';
  isAdded: boolean = false;
  alphabetPattern = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.initializeForm();
  }

  initializeForm(): FormGroup{
    let form:FormGroup = this.fb.group({
      fullName: [''],
      address: this.fb.group({
        areaName: [''],
        cityName: [''],
        countryName: ['']
      }),
      name: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/) ]],
      hobbies: this.fb.array([
      ], Validators.required)
    });
    return form;
  }


  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.userService.getList()
      .subscribe(
        (data: User) => {
          this.userDetails = data;
          this.setUserHobbies(this.userDetails);
        }
      );
  }

  setUserHobbies(userData: User): void {
    this.userDetails.hobbies.map((obj) => obj.isChecked = false);
    this.setUserAddress();
    this.setUserFormValues();
  }

  setUserAddress(): void {
    this.userAddress = `${this.userDetails.address.areaName} ${this.userDetails.address.cityName} ${this.userDetails.address.countryName}`;
  }


  setUserFormValues(): void {
    this.userForm.get('fullName')?.setValue(this.userDetails.fullName);
    this.userForm.get('address')?.get('areaName')?.setValue(this.userDetails.address.areaName);
    this.userForm.get('address')?.get('cityName')?.setValue(this.userDetails.address.cityName);
    this.userForm.get('address')?.get('countryName')?.setValue(this.userDetails.address.countryName);
    const array = this.userForm.get('hobbies') as FormArray ;
    array.clear();
    
    for (var row of this.userDetails.hobbies) {
      array.push(this.createHobbyControl(row.name));
    }
    this.userForm.validator = MatchValidator('name', this.userDetails?.hobbies);
  }

  createHobbyControl(hobbyName?: String): FormGroup {
    return this.fb.group({ name: hobbyName });
  }


  addHobby(): void {
    this.isAdded = true;

    if(!this.userForm.get('name')?.value.length || this.userForm.get('name')?.errors){
      return;
    }
    else{
      const hobbyName = this.userForm.get('name')?.value;
      (<FormArray>this.userForm.get('hobbies'))?.push(this.createHobbyControl(hobbyName));
      this.updateUserDetails(hobbyName);
      this.clearHobby();
    }
    
  }

  clearHobby(): void {
    this.userForm.get('name')?.setValue('');
    this.isAdded = false;
  }

  updateUserDetails(hobbyName: String): void {
    this.userDetails.hobbies.push({ name: hobbyName, isChecked: false });
    this.isAdded = false;
  }

  removeHobbies(): void {
    this.userDetails.hobbies = this.userDetails.hobbies.filter(function (obj) {
      return !obj.isChecked
    });
    this.setUserFormValues();
  }

  submitUserForm(): void {
    console.log(`Form submitted successfully: ${JSON.stringify(this.userForm.value)}`);
    this.isAdded = false;
  }

}
