import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const getLoginUrl = '/api/v1/session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData){
    return this.http.post(`${environment.apiUrl}${getLoginUrl}`, loginData)
  }

  setToken(token){
    console.log(token);
    localStorage.setItem('token' , token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  
  deleteToken(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
