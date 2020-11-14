import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
msg : any = "";
  constructor(private http: HttpClient) { }
  loginform = new FormGroup (
    {
      email: new FormControl ('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    }
  )
  get email(){ return this.loginform.get('email') };
  get password() {return this.loginform.get('password')};

  collectdata(){
    this.http.post('http://localhost:5000/api/v1/session', this.loginform.value).subscribe(
      (response) =>{
        this.msg=response ;
        console.log(response);
        
      },
      (error) => console.log(error)
    )
  }




  ngOnInit(): void {
  }
  
}
