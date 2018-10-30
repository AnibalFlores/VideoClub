import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../interface/services/auth.service';
import { AlertService } from '../interface/services/alert.service';
import { DataService } from '../interface/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private AuthSrv: AuthService,
    private dataSrv: DataService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset del login status
    this.AuthSrv.logout();

    // obtengo url de retorno url del router
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // geter de los form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // hay algo mal paramos aca
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.AuthSrv.login(this.f.username.value, this.f.password.value)) {
      this.dataSrv.getPeliculas();
      if (this.AuthSrv.isAdmin()) { this.router.navigate(['/dashboard']); } else {
        this.router.navigate(['/landing']);
      }

    } else {
      this.alertService.error('No se pudo loguear verifique sus datos');
      this.loading = false;
    }

  }
}
