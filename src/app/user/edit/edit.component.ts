import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr'
import { User } from '../../../types/user'
import { formatDateForInput } from '../../../utils/format-date'

@Component({
	selector: 'user-edit',
	standalone: true,
	imports: [ReactiveFormsModule, BackButtonDirective, CommonModule],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class UserEditComponent implements OnInit {
	isEdit: boolean = true
	userId: number | null = null
	userForm: FormGroup
	isLoading: boolean = false

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private router: Router,
		private toastr: ToastrService,
	) {
		this.userForm = this.fb.group({
			codUsu: [{ value: '', disabled: true }],
			nomUsu: ['', Validators.required],
			apeUsu: ['', Validators.required],
			correoUsu: ['', [Validators.required, Validators.email]],
			contraUsu: [''],
			rolUsu: [0],
			estUsu: [1],
			fecUsu: [{ value: new Date(), disabled: true }],
		})
	}

	public ngOnInit(): void {
		this.userId = this.activatedRoute.snapshot.params['id']
		this.isEdit = !!this.userId
		if (this.userId) this.getData()
	}

	public getData(): void {
		if (!this.userId) return
		this.userService.getUserById(this.userId).subscribe({
			next: (res) =>
				this.userForm.patchValue({
					...(res.body as User),
					fecUsu: formatDateForInput((res.body as User).fecUsu),
				}),
			error: (err) => {
				this.router.navigate(['/product'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public create(): void {
		delete this.userForm.value.codUsu
		delete this.userForm.value.fecUsu
		this.userService.createUser(this.userForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/user'])
			},
			error: (err) => {
				this.isLoading = false
				this.toastr.error(err.error.message)
			},
		})
	}

	public update(): void {
		if (!this.userId) return
		delete this.userForm.value.contraUsu
		delete this.userForm.value.fecUsu
		this.userService.updateUser(this.userId, this.userForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/user'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public onSubmit(): void {
		if (this.userForm.valid) {
			this.userForm.disable()
			this.isLoading = true
			this.isEdit ? this.update() : this.create()
		} else {
			this.toastr.error('Please fill out the form correctly.')
		}
	}
}
