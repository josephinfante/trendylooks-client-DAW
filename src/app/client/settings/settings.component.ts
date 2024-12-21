import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { User } from '../../../types/user'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr'
import { LocalStorageService } from '../../services/local-storage.service'
import { formatDateForInput } from '../../../utils/format-date'

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
	userId: number | null = null
	userForm: FormGroup

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private router: Router,
		private toastr: ToastrService,
		private localStorageService: LocalStorageService,
	) {
		// Initialize form using FormBuilder
		this.userForm = this.fb.group({
			nomUsu: ['', Validators.required],
			apeUsu: ['', Validators.required],
			correoUsu: ['', [Validators.required, Validators.email]],
			fecUsu: [{ value: new Date(), disabled: true }],
		})
	}

	public ngOnInit(): void {
		const localUser = JSON.parse(this.localStorageService.getItem('user') || '{}')
		this.userId = localUser.codUsu

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

	public onSubmit() {
		if (this.userForm.valid) {
			console.log('User data submitted:', this.userForm.value)
			// Implement the save logic, such as sending the form data to the backend
		}
	}
}
