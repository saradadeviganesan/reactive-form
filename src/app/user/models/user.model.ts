import {
    required,
    prop,
    propObject,
    propArray
  } from "@rxweb/reactive-form-validators";
  
  import { Address } from "./address.model";
  import { Hobby } from "./hobby.model";
  
  export interface User {
    fullName: String;
    address: Address;
    hobbies: Hobby[];
  }