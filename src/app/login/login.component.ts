import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../services/user.service'
import { HttpResponse } from '@angular/common/http'
import { LocalStorageService } from '../services/local-storage.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup
	isLoading = false

	constructor(
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private userService: UserService,
		private localStorageService: LocalStorageService,
		private router: Router,
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		})
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.isLoading = true
		this.loginForm.markAllAsTouched()
		if (!this.loginForm.valid) {
			this.toastr.error('Please fill out the form correctly.')
			return
		}
		this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe({
			next: (res: HttpResponse<any>) => {
				const token = res.headers.get('token')
				const role = res.headers.get('role')
				if (!token || !role) throw new Error('No token found.')
				this.localStorageService.setItem('token', token)
				this.localStorageService.setItem('role', role)
				this.localStorageService.setItem('user', JSON.stringify(res.body?.user))
				this.toastr.success(res.body.message)

				this.isLoading = false
				if (role == 'user') return this.router.navigate(['product-listing'])
				return this.router.navigate(['dashboard'])
			},
			error: (err) => {
				this.isLoading = false
				this.toastr.error(err.error.message)
			},
		})
	}
}
