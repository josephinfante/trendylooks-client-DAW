import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'
import { Order } from '../../types/order'

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(protected http: HttpApiService) {}

	createOrder(order: Partial<Order>) {
		return this.http.post(`api/order`, order)
	}

	updateOrder(id: number, order: Partial<Order>) {
		return this.http.put(`api/order`, { id, ...order })
	}

	getAllOrders(pageNumber: number, pageSize: number) {
		return this.http.get(`api/order?page=${pageNumber}&size=${pageSize}`)
	}

	getOrderById(id: number) {
		return this.http.get(`api/order/${id}`)
	}
}
