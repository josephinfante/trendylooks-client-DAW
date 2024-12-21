import { Component, OnInit } from '@angular/core'
import { CartDetail } from '../../../types/cart-detail'
import { ActivatedRoute, Router } from '@angular/router'
import { CartDetailService } from '../../services/cart-detail.service'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'cart-detail-details',
	imports: [BackButtonDirective],
	templateUrl: './details.component.html',
	styleUrl: './details.component.css',
	standalone: true,
})
export class CartDetailDetailsComponent implements OnInit {
	cartDetailId: number | null = null
	cartDetail: CartDetail | null = null

	constructor(
		private activatedRoute: ActivatedRoute,
		private cartDetailService: CartDetailService,
		private router: Router,
		private toastr: ToastrService,
	) {}

	public ngOnInit(): void {
		this.cartDetailId = this.activatedRoute.snapshot.params['id']
		this.getData()
	}

	public getData(): void {
		if (!this.cartDetailId) return
		this.cartDetailService.getCartDetailById(this.cartDetailId).subscribe({
			next: (res) => {
				this.cartDetail = res.body as CartDetail
			},
			error: (err) => {
				this.router.navigate(['/cart-detail'])
				this.toastr.error(err.error.message)
			},
		})
	}

}
