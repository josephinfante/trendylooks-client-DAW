import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'
import { Category } from '../../types/category'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	constructor(protected http: HttpApiService) {}

	createCategory(category: Partial<Category>) {
		return this.http.post(`api/category`, category)
	}

	updateCategory(id: number, category: Partial<Category>) {
		return this.http.put(`api/category`, { codCat: id, ...category })
	}

	getAllCategories(pageNumber: number, pageSize: number) {
		return this.http.get(`api/category?page=${pageNumber}&size=${pageSize}`)
	}

	getCategoryById(id: number) {
		return this.http.get(`api/category/${id}`)
	}
}
