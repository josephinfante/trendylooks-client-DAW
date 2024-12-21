import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup

	constructor(
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private userService: UserService,
		private router: Router,
	) {
		this.registerForm = this.formBuilder.group({
			nomUsu: ['', [Validators.required]],
			apeUsu: ['', [Validators.required]],
			correoUsu: ['', [Validators.required, Validators.email]],
			contraUsu: ['', [Validators.required]],
			rolUsu: [0],
		})
	}

	public ngOnInit(): void {}

	onSubmit(): void {
		this.registerForm.markAllAsTouched()
		if (!this.registerForm.valid) {
			this.toastr.error('Completa el formulario.')
			return
		}
		this.userService.createUser(this.registerForm.value).subscribe({
			next: (res: HttpResponse<any>) => {
				this.toastr.success(res.body.message)
				return this.router.navigate(['login'])
			},
			error: (err) => {
				if (err.error.message.includes('Duplicate entry')) this.toastr.error('User already exists.')
				else this.toastr.error(err.error.message)
			},
		})
	}
}
