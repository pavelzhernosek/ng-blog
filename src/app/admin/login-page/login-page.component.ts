import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  message: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["loginAgain"]) {
        this.message = "Please log in";
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const { email, password } = this.form.value;
    const user: User = {
      email,
      password
    };
    this.authService.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(["/admin", "dashboard"]);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
