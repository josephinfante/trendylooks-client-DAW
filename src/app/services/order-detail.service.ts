import { Injectable } from '@angular/core'
import { OrderDetails } from '../../types/order-details'
import { HttpApiService } from './http-api.service'

@Injectable({
	providedIn: 'root',
})
export class OrderDetailService {
	constructor(private http: HttpApiService) {}

	createOrder(orderDetail: Partial<OrderDetails>) {
		return this.http.post(`api/order-detail`, orderDetail)
	}

	updateOrder(id: number, orderDetail: Partial<OrderDetails>) {
		return this.http.put(`api/order-detail`, { id, ...orderDetail })
	}

	getAllOrders(pageNumber: number, pageSize: number) {
		return this.http.get(`api/order-detail?page=${pageNumber}&size=${pageSize}`)
	}

	getOrderById(id: number) {
		return this.http.get(`api/order-detail/${id}`)
	}
}
