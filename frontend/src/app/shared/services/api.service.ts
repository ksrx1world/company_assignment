import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const getUsersUrl = '/api/v1/users';
const getSingleUser = '/api/v1/user';


@Injectable(

)
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  getUsers()
  {
    const token=localStorage.getItem('token');
    return this.http.get(`${environment.apiUrl}${getUsersUrl}/${token}`);
  }

  deleteUser(id){
   return this.http.delete(`${environment.apiUrl}${getUsersUrl}/${id}`);
  }
 
  editUser(id,formData){
    return this.http.put(`${environment.apiUrl}${getUsersUrl}/${id}`,formData);
  }

  registerUser(formData){
    return this.http.post(`${environment.apiUrl}${getUsersUrl}`, formData)
  }
  
  getCurrentData(id){
    return this.http.get(`${environment.apiUrl}${getSingleUser}/${id}`)
  }

 

}
