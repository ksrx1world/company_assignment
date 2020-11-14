import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup , Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  msg: any ="";
  constructor(private http: HttpClient
    ) { }

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



  collectdata(){
      this.http.post('http://localhost:5000/api/v1/users', this.registerform.value).subscribe(
        (response) =>{
          this.msg=response ;
          console.log(response);
          
        },
        (error) => console.log(error)
      )
    
    console.log(this.registerform.value)
  }


 

  ngOnInit(): void {
  }

}
