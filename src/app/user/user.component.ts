import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faChevronLeft, faChevronRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FindAllResponse } from '../../types/find-all-response'
import { User } from '../../types/user'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	templateUrl: './user.component.html',
	styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<User> | null = null
	pageNumber: number = 1
	pageSize: number = 5
	availablePageSizes: number[] = [5, 10, 20]

	constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

	public ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.userService.getAllUsers(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<User>),
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public seeDetails(id: number): void {
		this.router.navigate(['user', id])
	}

	public goToEdit(id: number): void {
		this.router.navigate(['user/edit', id])
	}

	public setPage(page: number): void {
		if (page > 0 && page <= (this.data?.totalPages || 1)) {
			this.pageNumber = page
			this.getData(this.pageNumber, this.pageSize)
		}
	}

	public changePageSize(event: Event): void {
		const selectElement = event.target as HTMLSelectElement
		const newPageSize = Number(selectElement.value)

		this.pageSize = newPageSize
		this.pageNumber = 1
		this.getData(this.pageNumber, this.pageSize)
	}

	public updateStatus(id: number, status: boolean): void {
		this.userService.updateUser(id, { estUsu: status ? 1 : 0 }).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)

				const user = this.data?.items.find((p) => p.codUsu === id)
				if (user) {
					user.estUsu = status ? 1 : 0
				}
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public goToCreate(): void {
		this.router.navigate(['user/create'])
	}

	public goToDashboard(): void {
		this.router.navigate(['dashboard'])
	}
}
