import { Component, OnInit } from '@angular/core'
import { OrderService } from '../services/order.service'
import { FindAllResponse } from '../../types/find-all-response'
import { Order } from '../../types/order'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faEllipsisVertical, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-order',
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	templateUrl: './order.component.html',
	styleUrl: './order.component.css',
	standalone: true,
})
export class OrderComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<Order> | null = null
	pageNumber: number = 1
	pageSize: number = 5
	availablePageSizes: number[] = [5, 10, 20]

	constructor(private orderService: OrderService, private router: Router, private toastr: ToastrService) {}

	public ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.orderService.getAllOrders(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<Order>),
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public seeDetails(id: number): void {
		this.router.navigate(['order', id])
	}

	public goToEdit(id: number): void {
		this.router.navigate(['order/edit', id])
	}

	public goToCreate(): void {
		this.router.navigate(['order/create'])
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

	public updateStatus(id: number, status: string): void {
		this.orderService.updateOrder(id, { estPed: status }).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)

				const order = this.data?.items.find((o) => o.codPed === id)
				if (order) {
					order.estPed = status
				}
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}
}
