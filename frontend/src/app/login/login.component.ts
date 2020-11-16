import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
msg : any = "";
params: any ="";

  constructor(private authService: AuthService, 
              private router: Router, 
              private route: ActivatedRoute) { }


  loginform = new FormGroup (
    {
      email: new FormControl ('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    }
  )
  get email(){ return this.loginform.get('email') };
  get password() {return this.loginform.get('password')};

  collectdata(){
    this.authService.login(this.loginform.value).subscribe(
      (response) =>{
        this.msg=response;
        if(this.msg.status == 'success'){
          this.authService.setToken(this.msg.token);
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        // console.log(error);
        this.authService.checkError(error);
      }
    )
  }




  ngOnInit(): void {
    this.route.queryParamMap
  .subscribe((params) => {
    this.params = params;
    // console.log(params)
  }
  )

  }
  
}
