import { Component, OnInit } from '@angular/core'
import { CartDetail } from '../../../types/cart-detail'
import { ActivatedRoute, Router } from '@angular/router'
import { CartDetailService } from '../../services/cart-detail.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'cart-detail-edit',
	standalone: true,
	imports: [ReactiveFormsModule, BackButtonDirective, CommonModule],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class CartDetailEditComponent implements OnInit {
	isEdit: boolean = true
	cartDetailId: number | null = null
	cartDetailForm: FormGroup

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private cartDetailService: CartDetailService,
		private router: Router,
		private toastr: ToastrService,
	) {
		this.cartDetailForm = this.fb.group({
			codDetCarr: [{ value: '', disabled: true }],
			codCarr: [ 0, Validators.required ],
			codProd: [ 0, Validators.required ],
			canDetCarr: [ 0, Validators.required ],
		})
	}

	public ngOnInit(): void {
		this.cartDetailId = this.activatedRoute.snapshot.params['id']
		this.isEdit = !!this.cartDetailId
		if (this.cartDetailId) this.getData()
	}

	public getData(): void {
		if (!this.cartDetailId) return
		this.cartDetailService.getCartDetailById(this.cartDetailId).subscribe({
			next: (res) =>
				this.cartDetailForm.patchValue({
					...(res.body as CartDetail),
				}),
			error: (err) => {
				this.router.navigate(['/cart-detail'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public create(): void {
		delete this.cartDetailForm.value.codDetCarr
		this.cartDetailService.createCartDetail(this.cartDetailForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/cart-detail'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public update(): void {
		if (!this.cartDetailId) return
		this.cartDetailService.updateCartDetail(this.cartDetailId, this.cartDetailForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/cart-detail'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public onSubmit(): void {
		if (this.cartDetailForm.valid) {
			this.isEdit ? this.update() : this.create()
		} else {
			this.toastr.error('Please fill out the form correctly.')
		}
	}
}
