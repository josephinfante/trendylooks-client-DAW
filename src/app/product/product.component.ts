import { Component, OnInit } from '@angular/core'
import { ProductService } from '../services/product.service'
import { FindAllResponse } from '../../types/find-all-response'
import { Product } from '../../types/product'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faEllipsisVertical, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-product',
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	templateUrl: './product.component.html',
	styleUrl: './product.component.css',
	standalone: true,
})
export class ProductComponent implements OnInit {
	faEllipsisVertical = faEllipsisVertical
	faChevronRight = faChevronRight
	faChevronLeft = faChevronLeft

	data: FindAllResponse<Product> | null = null
	pageNumber: number = 1
	pageSize: number = 5
	availablePageSizes: number[] = [5, 10, 20]

	constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) {}

	public ngOnInit(): void {
		this.getData(this.pageNumber, this.pageSize)
	}

	public getData(pageNumber: number, pageSize: number): void {
		this.productService.getAllProducts(pageNumber, pageSize).subscribe({
			next: (res) => (this.data = res.body as FindAllResponse<Product>),
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public seeDetails(id: number): void {
		this.router.navigate(['product', id])
	}

	public goToEdit(id: number): void {
		this.router.navigate(['product/edit', id])
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
		this.productService.updateProduct(id, { estProd: status }).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)

				const product = this.data?.items.find((p) => p.codProd === id)
				if (product) {
					product.estProd = status
				}
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}
}
