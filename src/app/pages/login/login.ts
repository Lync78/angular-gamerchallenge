import { Component } from '@angular/core';
import { Auth } from "../../core/services/auth.service";
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private error: string = "";

  readonly form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private authService: Auth, private router: Router){}

  login(): void {
    const { email, password } = this.form.getRawValue();
    if (email != null && password != null) {

      this.authService.login(email, password)
        .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.error = "Identifiants incorrects";
        }
      });
    }
    /*

    */
  }

  
}
