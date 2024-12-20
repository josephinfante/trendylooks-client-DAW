import { Component, OnInit } from '@angular/core'
import { Product } from '../../../types/product'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { formatDate } from '../../../utils/format-date'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'product-details',
	imports: [BackButtonDirective],
	templateUrl: './details.component.html',
	styleUrl: './details.component.css',
	standalone: true,
})
export class ProductDetailsComponent implements OnInit {
	productId: number | null = null
	product: Product | null = null

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private router: Router,
		private toastr: ToastrService,
	) {}

	public ngOnInit(): void {
		this.productId = this.activatedRoute.snapshot.params['id']
		this.getData()
	}

	public getData(): void {
		if (!this.productId) return
		this.productService.getProductById(this.productId).subscribe({
			next: (res) => {
				this.product = res.body as Product
			},
			error: (err) => {
				this.router.navigate(['/product'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public formatDate = (date: string | undefined): string => formatDate(date)
}
