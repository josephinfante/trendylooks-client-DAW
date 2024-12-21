import { Component, OnInit } from '@angular/core'
import { Category } from '../../../types/category'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryService } from '../../services/category.service'
import { formatDate } from '../../../utils/format-date'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'category-details',
	imports: [BackButtonDirective],
	templateUrl: './details.component.html',
	styleUrl: './details.component.css',
	standalone: true,
})
export class CategoryDetailsComponent implements OnInit {
	categoryId: number | null = null
	category: Category | null = null

	constructor(
		private activatedRoute: ActivatedRoute,
		private categoryService: CategoryService,
		private router: Router,
		private toastr: ToastrService,
	) {}

	public ngOnInit(): void {
		this.categoryId = this.activatedRoute.snapshot.params['id']
		this.getData()
	}

	public getData(): void {
		if (!this.categoryId) return
		this.categoryService.getCategoryById(this.categoryId).subscribe({
			next: (res) => {
				this.category = res.body as Category
			},
			error: (err) => {
				this.router.navigate(['/category'])
				this.toastr.error(err.error.message)
			},
		})
	}

	public formatDate = (date: string | undefined): string => formatDate(date)
}
