import { Component, OnInit } from '@angular/core'
import { Category } from '../../../types/category'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryService } from '../../services/category.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { formatDateForInput } from '../../../utils/format-date'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'category-edit',
	standalone: true,
	imports: [ReactiveFormsModule, BackButtonDirective, CommonModule],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class CategoryEditComponent implements OnInit {
	isEdit: boolean = true
	categoryId: number | null = null
	categoryForm: FormGroup

	constructor(
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private categoryService: CategoryService,
		private router: Router,
		private toastr: ToastrService,
	) {
		this.categoryForm = this.fb.group({
			codCat: [{ value: '', disabled: true }],
			nomCat: ['', Validators.required],
			estCat: [true],
			fecCat: [{ value: new Date(), disabled: true }],
		})
	}

	public ngOnInit(): void {
		this.categoryId = this.activatedRoute.snapshot.params['id']
		this.isEdit = !!this.categoryId
		if (this.categoryId) this.getData()
	}

	public getData(): void {
		if (!this.categoryId) return
		this.categoryService.getCategoryById(this.categoryId).subscribe({
			next: (res) =>
				this.categoryForm.patchValue({
					...(res.body as Category),
					fecCat: formatDateForInput((res.body as Category).fecCat),
				}),
			error: (err) => {
				this.router.navigate(['/category'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public create(): void {
		delete this.categoryForm.value.codCat
		delete this.categoryForm.value.fecCat
		this.categoryService.createCategory(this.categoryForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/category'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public update(): void {
		if (!this.categoryId) return
		this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe({
			next: (res) => {
				const response = res.body as { message: string }
				this.toastr.success(response.message)
				this.router.navigate(['/category'])
			},
			error: (err) => this.toastr.error(err.error.message),
		})
	}

	public onSubmit(): void {
		if (this.categoryForm.valid) {
			this.isEdit ? this.update() : this.create()
		} else {
			this.toastr.error('Please fill out the form correctly.')
		}
	}
}
