import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl , FormGroup , Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  msg: any ="";
  constructor(private http: HttpClient, 
              private apiService : ApiService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
              ){}

token= this.authService.getToken()

  registerform = new FormGroup (
    {
      name: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl ('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone_number: new FormControl ('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    }
  )
  get email(){ return this.registerform.get('email') };
  get name(){return this.registerform.get('name')};
  get phone_number(){return this.registerform.get('phone_number')};
  get password() {return this.registerform.get('password')};



  registerUser(){
      
      this.msg="";
      this.registerform = this.fb.group({
        email: this.email,
        name: this.name,
        phone_number: this.phone_number,
        password: this.password,
        token: this.token
      });
      console.log(this.registerform)
      this.apiService.registerUser(this.registerform.value).subscribe(
        (response) =>{
          this.msg=response ;
          console.log(response);
          if(!this.token){
            this.router.navigate(['/login'], { queryParams: { msg: "User Successfully registered Please login" , status: "success"  }})
          }
          this.router.navigate(['/dashboard'])
        },
        (error) => console.log(error)
      )
    
    console.log(this.registerform.value)
  }


 

  ngOnInit(): void {
  }

}
