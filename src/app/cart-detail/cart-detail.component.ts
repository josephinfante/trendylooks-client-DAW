import { Component, OnInit } from '@angular/core'
import { CartDetailService } from '../services/cart-detail.service'
import { FindAllResponse } from '../../types/find-all-response'
import { CartDetail } from '../../types/cart-detail'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faEllipsisVertical, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-cart-detail',
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	templateUrl: './cart-detail.component.html',
	styleUrl: './cart-detail.component.css',
	standalone: true,
})
export class CartDetailComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<CartDetail> | null = null
	pageNumber: number = 1
	pageSize: number = 5
	availablePageSizes: number[] = [5, 10, 20]

	constructor(private cartDetailService: CartDetailService, private router: Router, private toastr: ToastrService) {}

	public ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.cartDetailService.getAllCartDetails(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<CartDetail>),
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public seeDetails(id: number): void {
		this.router.navigate(['cart-detail', id])
	}

	public goToEdit(id: number): void {
		this.router.navigate(['cart-detail/edit', id])
	}

	public goToCreate(): void {
		this.router.navigate(['cart-detail/create'])
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
}