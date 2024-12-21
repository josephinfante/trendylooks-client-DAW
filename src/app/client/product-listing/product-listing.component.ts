import { Component, OnInit } from '@angular/core'
import { Product } from '../../../types/product'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { FindAllResponse } from '../../../types/find-all-response'
import { faChevronLeft, faChevronRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { StoreService } from '../../services/store.service'
import { ToastrService } from 'ngx-toastr'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'

@Component({
	selector: 'app-product-listing',
	standalone: true,
	imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
	templateUrl: './product-listing.component.html',
	styleUrl: './product-listing.component.css',
})
export class ProductListingComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<Product> | null = null
	pageNumber: number = 1
	pageSize: number = 9
	availablePageSizes: number[] = [9, 18, 36]

	constructor(private storeService: StoreService, private router: Router, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.storeService.getProductListing(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<Product>),
			error: (err) => this.toastr.error(err.error.message),
		})
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
