import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  userdata:any = ''
  show=true;
  constructor(private apiService : ApiService,
              private authService: AuthService
              // private cdr: ChangeDetectorRef,
    ) { }

   
  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(){
    this.apiService.getUsers().subscribe(
      (response) =>{
        this.userdata=response;
        // this.cdr.detectChanges;
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.authService.checkError(error);
      }
    )}


  deleteUser(id){
    this.apiService.deleteUser(id).subscribe(
      (response) =>{
        console.log(response);
        this.getUsers();
      },
      (error) => {
        console.log(error);
        this.authService.checkError(error);
      }
    )}
  

  ngOnDestroy(){
    // this.cdr.detach();
  }

  

}
