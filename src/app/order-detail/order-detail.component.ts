import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faChevronLeft, faChevronRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { OrderDetails } from '../../types/order-details'
import { FindAllResponse } from '../../types/find-all-response'
import { OrderDetailService } from '../services/order-detail.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-order-detail',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	templateUrl: './order-detail.component.html',
	styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<OrderDetails> | null = null
	pageNumber: number = 1
	pageSize: number = 5
	availablePageSizes: number[] = [5, 10, 20]

	constructor(private orderDetailService: OrderDetailService, private router: Router, private toastr: ToastrService) {}

	public ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.orderDetailService.getAllOrders(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<OrderDetails>),
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public seeDetails(id: number): void {
		this.router.navigate(['order-details', id])
	}

	public goToEdit(id: number): void {
		this.router.navigate(['order-details/edit', id])
	}

	public goToCreate(): void {
		this.router.navigate(['order-details/create'])
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
