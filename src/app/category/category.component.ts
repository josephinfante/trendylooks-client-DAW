import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../services/category.service'
import { FindAllResponse } from '../../types/find-all-response'
import { Category } from '../../types/category'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faEllipsisVertical, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-category',
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	templateUrl: './category.component.html',
	styleUrl: './category.component.css',
	standalone: true,
})
export class CategoryComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<Category> | null = null
	pageNumber: number = 1
	pageSize: number = 5
	availablePageSizes: number[] = [5, 10, 20]

	constructor(private categoryService: CategoryService, private router: Router, private toastr: ToastrService) {}

	public ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.categoryService.getAllCategories(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<Category>),
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public seeDetails(id: number): void {
		this.router.navigate(['category', id])
	}

	public goToEdit(id: number): void {
		this.router.navigate(['category/edit', id])
	}

	public goToCreate(): void {
		this.router.navigate(['category/create'])
	}

  public goToDashboard(): void {
		this.router.navigate(['dashboard'])
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
		this.categoryService.updateCategory(id, { estCat: status }).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)

				const category = this.data?.items.find((p) => p.codCat === id)
				if (category) {
					category.estCat = status
				}
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}
}
