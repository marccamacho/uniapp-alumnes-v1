import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(token:string) {
    localStorage.setItem('edu360-token', token);
  }

  getToken() {
    return localStorage.getItem('edu360-token');
  }

  decodeToken(token:string){
    return this.getDecodedAccessToken(token);
  }

  getDecodedToken() {
    var token = localStorage.getItem('edu360-token');
    if (token == null) return {}
    return this.getDecodedAccessToken(token);
  }

  getItem(key:string) {
    return localStorage.getItem(key);
  }

  getRoles() {
    var token = localStorage.getItem('edu360-token');
    if (token != null) {
      return this.getDecodedAccessToken(token).payload['werpRoles'];
    }
    return [];
  }

  getPerson() {
    var token = localStorage.getItem('edu360-token');
    if (token != null) {
      return this.getDecodedAccessToken(token).payload['person'];
    }
    return {};
  }

  getPersonRid() {
    return this.getPerson().rid;
  }

  setItem(key:any, value:any) {
    localStorage.setItem(key, value);
  }

  clear(){
    localStorage.clear();
  }

  keyExists(key:any) {
    return (localStorage.getItem(key) != null);
  }

  setFilterTags(tags:any){
    localStorage.setItem('filterTags', JSON.stringify(tags));
  }

  getFilterTags() {
    var filterTags = localStorage.getItem('filterTags');
    if (filterTags != null) {
      return JSON.parse(filterTags);
    }
    return {};
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.log(Error);
      return null;
    }
  }

}