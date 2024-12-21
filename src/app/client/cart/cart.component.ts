import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
	cartItems: any[] = []

	constructor() {
		this.cartItems = [
			{ id: 1, nombre: 'Producto 1', cantidad: 2, precio: 25.0 },
			{ id: 2, nombre: 'Producto 2', cantidad: 1, precio: 45.0 },
		]
	}

	public ngOnInit(): void {}

	public getTotal(): number {
		return this.cartItems.reduce((acc, item) => acc + item.cantidad * item.precio, 0)
	}

	public updateQuantity(item: any): void {
		if (item.cantidad < 1) {
			item.cantidad = 1
		}
	}

	public increaseQuantity(item: any): void {
		item.cantidad++
		this.updateQuantity(item)
	}

	public decreaseQuantity(item: any): void {
		if (item.cantidad > 1) {
			item.cantidad--
			this.updateQuantity(item)
		}
	}

	public removeFromCart(item: any): void {
		this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id)
	}
}
