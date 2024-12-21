import { Component, OnInit } from '@angular/core'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { User } from '../../../types/user'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { ToastrService } from 'ngx-toastr'
import { formatDate } from '../../../utils/format-date'

@Component({
	selector: 'user-details',
	standalone: true,
	imports: [BackButtonDirective],
	templateUrl: './details.component.html',
	styleUrl: './details.component.css',
})
export class UserDetailsComponent implements OnInit {
	userId: number | null = null
	user: User | null = null

	constructor(
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private router: Router,
		private toastr: ToastrService,
	) {}

	public ngOnInit(): void {
		this.userId = this.activatedRoute.snapshot.params['id']
		this.getData()
	}

	public getData(): void {
		if (!this.userId) return
		this.userService.getUserById(this.userId).subscribe({
			next: (res) => {
				this.user = res.body as User
			},
			error: (err) => {
				this.router.navigate(['/user'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public formatDate = (date: string | undefined): string => formatDate(date)
}
