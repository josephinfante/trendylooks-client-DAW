import { Component, OnInit } from '@angular/core'
import { Order } from '../../../types/order'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderService } from '../../services/order.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'order-edit',
	standalone: true,
	imports: [ReactiveFormsModule, BackButtonDirective, CommonModule],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class OrderEditComponent implements OnInit {
	isEdit: boolean = true
	orderId: number | null = null
	orderForm: FormGroup

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private orderService: OrderService,
		private router: Router,
		private toastr: ToastrService,
	) {
		this.orderForm = this.fb.group({
			codPed: ['', Validators.required],
			codUsu: ['', Validators.required],
			totPed: ['', [Validators.required, Validators.min(1)]],
			contPed: ['', Validators.required],
			telPed: ['', [Validators.required]],
			dirPed: ['', Validators.required],
			estPed: ['Pendiente', Validators.required],
			fecPed: [{ value: new Date(), disabled: true }],
		})
	}

	public ngOnInit(): void {
		this.orderId = this.activatedRoute.snapshot.params['id']
		this.isEdit = !!this.orderId
		if (this.orderId) this.getData()
	}

	public getData(): void {
		if (!this.orderId) return
		this.orderService.getOrderById(this.orderId).subscribe({
			next: (res) =>
				this.orderForm.patchValue({
					...(res.body as Order),
					fecPed: new Date((res.body as Order).fecPed),
				}),
			error: (err) => {
				this.router.navigate(['/order'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public create(): void {
		delete this.orderForm.value.codPed
		delete this.orderForm.value.fecPed
		this.orderService.createOrder(this.orderForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/order'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public update(): void {
		if (!this.orderId) return
		this.orderService.updateOrder(this.orderId, this.orderForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/order'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public onSubmit(): void {
		if (this.orderForm.valid) {
			this.isEdit ? this.update() : this.create()
		} else {
			this.toastr.error('Por favor, complete el formulario correctamente.')
		}
	}
}
