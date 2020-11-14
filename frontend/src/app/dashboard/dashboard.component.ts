import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userdata:any = ''
  constructor(private http : HttpClient) { }

   
  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/v1/users').subscribe(
      (response) =>{
        this.userdata=response ;
        console.log(response);
      },
      (error) => console.log(error)
    )

  }
  
  deletedata(id){
    this.http.delete('http://localhost:5000/api/v1/users/'+id).subscribe(
      (response) =>{
        console.log(response);
      },
      (error) => console.log(error)
    )
    this.ngOnInit();
  }
  

}
