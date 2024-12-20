import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'
import { Product } from '../../types/product'

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(protected http: HttpApiService) {}

	createProduct(product: Partial<Product>) {
		return this.http.post(`api/product`, product)
	}

	updateProduct(id: number, product: Partial<Product>) {
		return this.http.put(`api/product`, { codProd: id, ...product })
	}

	getAllProducts(pageNumber: number, pageSize: number) {
		return this.http.get(`api/product?page=${pageNumber}&size=${pageSize}`)
	}

	getProductById(id: number) {
		return this.http.get(`api/product/${id}`)
	}
}
