import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  msg: any ="";
  constructor( private apiService : ApiService, 
               private route: ActivatedRoute, 
               private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.getCurrentData();
  }

  editForm = new FormGroup (
    {
      name: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl ('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone_number: new FormControl ('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    }
  )
  get email(){ return this.editForm.get('email') };
  get name(){return this.editForm.get('name')};
  get phone_number(){return this.editForm.get('phone_number')};

 getCurrentData(){
   this.apiService.getCurrentData(this.route.snapshot.params.id).subscribe(
    (response) =>{
      console.log(response);
      this.editForm = new FormGroup (
        {
          name: new FormControl (response['name'], [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          email: new FormControl (response['email'], [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
          phone_number: new FormControl (response['phone_number'], [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        })
      },
    (error) => {
      console.log(error);
      this.authService.checkError(error);
      }
  )}

  editUser(){
    this.apiService.editUser(this.route.snapshot.params.id, this.editForm.value).subscribe(
      (response) => {
        console.log(response);
        this.msg=response;
        this.router.navigate(['/dashboard']);
      },
      (error) => { console.log(error);
        this.authService.checkError(error);
        }

    )}



  }
 
