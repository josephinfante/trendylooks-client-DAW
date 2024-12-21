import { Component, OnInit } from '@angular/core'
import { Product } from '../../../types/product'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { formatDateForInput } from '../../../utils/format-date'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { CommonModule } from '@angular/common'
import { UploadService } from '../../services/upload.service'

@Component({
	selector: 'product-edit',
	standalone: true,
	imports: [ReactiveFormsModule, BackButtonDirective, CommonModule],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class ProductEditComponent implements OnInit {
	isEdit: boolean = true
	productId: number | null = null
	productForm: FormGroup
	selectedFile: File | null = null
	isLoading: boolean = false

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private router: Router,
		private toastr: ToastrService,
		private uploadService: UploadService,
	) {
		this.productForm = this.fb.group({
			codProd: [{ value: '', disabled: true }],
			nomProd: ['', Validators.required],
			descProd: [''],
			codCat: ['', Validators.required],
			preProd: [0, [Validators.required, Validators.min(0)]],
			stockProd: [0, [Validators.required, Validators.min(0)]],
			imgProd: [''],
			estProd: [true],
			fecProd: [{ value: new Date(), disabled: true }],
		})
	}

	public ngOnInit(): void {
		this.productId = this.activatedRoute.snapshot.params['id']
		this.isEdit = !!this.productId
		if (this.productId) this.getData()
	}

	public getData(): void {
		if (!this.productId) return
		this.productService.getProductById(this.productId).subscribe({
			next: (res) =>
				this.productForm.patchValue({
					...(res.body as Product),
					fecProd: formatDateForInput((res.body as Product).fecProd),
				}),
			error: (err) => {
				this.router.navigate(['/product'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public create(): void {
		delete this.productForm.value.codProd
		delete this.productForm.value.fecProd
		if (this.selectedFile) {
			this.uploadService.uploadFile(this.selectedFile).subscribe({
				next: (res) => {
					this.productService.createProduct({ ...this.productForm.value, imgProd: res.secure_url }).subscribe({
						next: (res) => {
							const response = res.body as { message: string }
							this.toastr.success(response.message)
							this.router.navigate(['/product'])
							this.isLoading = false
						},
						error: (err) => {
							this.isLoading = false
							this.toastr.error(err.error.message)
						},
					})
				},
				error: (err) => {
					this.isLoading = false
					this.toastr.error(err.error.message)
				},
			})
		} else {
			this.productService.createProduct(this.productForm.value).subscribe({
				next: (res) => {
					const response = res.body as { message: string }
					this.toastr.success(response.message)
					this.router.navigate(['/product'])
				},
				error: (err) => {
					this.isLoading = false
					this.toastr.error(err.error.message)
				},
			})
		}
	}

	public update(): void {
		if (!this.productId) return
		this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/product'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public onSubmit(): void {
		if (this.productForm.valid) {
			this.productForm.disable()
			this.isLoading = true
			this.isEdit ? this.update() : this.create()
		} else {
			this.toastr.error('Please fill out the form correctly.')
		}
	}

	public onFileSelected(event: any) {
		const fileList: FileList = event.target.files
		if (fileList.length > 0) {
			this.selectedFile = fileList[0]
		} else {
			this.selectedFile = null
		}
	}
}
