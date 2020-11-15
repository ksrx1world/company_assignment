import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const getUsersUrl = '/api/v1/users';

@Injectable(

)
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get(`${environment.apiUrl}${getUsersUrl}`);
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
    return this.http.get(`${environment.apiUrl}${getUsersUrl}/${id}`)
  }
}
