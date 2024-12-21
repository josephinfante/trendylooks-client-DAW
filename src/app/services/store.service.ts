import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'

@Injectable({
	providedIn: 'root',
})
export class StoreService {
	constructor(protected http: HttpApiService) {}

	getProductListing(pageNumber: number, pageSize: number) {
		return this.http.get(`api/store/product-listing?page=${pageNumber}&size=${pageSize}`)
	}
}
