import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorLogin: string;
  hayErrorLogin: boolean;
  loading: boolean = false;
  constructor(private loginService: LoginService,
    private router: Router) {
      loginService.islogged.subscribe(isLogged=>{
        if(isLogged){
          router.navigate(['/hermanos'])
        }
      })
    this.crearFormLogin();
  }

  ngOnInit() {
  }

  crearFormLogin() {
    this.formLogin = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
    this.formLogin.valueChanges.subscribe(currentValue => {
      this.hayErrorLogin = false;
    })
  }

  login() {
    this.loading = true;
    this.loginService.login(this.formLogin.controls['username'].value, this.formLogin.controls['password'].value)
      .subscribe(data => {
        this.loading = false;
        if (data.logged) {
          this.loginService.setUsuarioActual(data.user);
          this.loginService.setTokenActual(data.token);
          this.loginService.islogged.next(true);
        }
      }, error => {
        this.loading = false;
        this.hayErrorLogin = true;
        this.errorLogin = JSON.parse(error._body).message;
      });
  }

}
