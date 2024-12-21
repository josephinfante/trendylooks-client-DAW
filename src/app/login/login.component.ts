import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../services/user.service'
import { HttpResponse } from '@angular/common/http'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup

	constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		})
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.loginForm.markAllAsTouched()
		if (!this.loginForm.valid) {
			this.toastr.error('Please fill out the form correctly.')
			return
		}
		this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe({
			next: (res: HttpResponse<any>) => {
				// const response = res.body as { message: string }
				// const token = res.headers.get('Token')
				// console.log(token)
				// this.toastr.success(response.message)
				console.log(res.body, res.headers.get('token'), res.headers)
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}
}
