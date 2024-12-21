import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'
import { CartDetail } from '../../types/cart-detail'

@Injectable({
    providedIn: 'root',
})
export class CartDetailService {
    constructor(protected http: HttpApiService) {}

    createCartDetail(cartDetail: Partial<CartDetail>) {
        return this.http.post(`api/cart-detail`, cartDetail)
    }

    updateCartDetail(id: number, cartDetail: Partial<CartDetail>) {
        return this.http.put(`api/cart-detail`, { codDetCarr: id, ...cartDetail })
    }

    getAllCartDetails(pageNumber: number, pageSize: number) {
        return this.http.get(`api/cart-detail?page=${pageNumber}&size=${pageSize}`)
    }

    getCartDetailById(id: number) {
        return this.http.get(`api/cart-detail/${id}`)
    }
}
