import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LocalStorageService } from '../../services/local-storage.service'

type Cart = {
	id: number
	codUsu: number
	products: Items[]
}

type Items = {
	codProd: number
	nomProd: string
	preProd: number
	imgProd: string
	quantity: number
}

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
	cartItems: Items[] = []

	constructor(private localStorageService: LocalStorageService) {}

	public ngOnInit(): void {
		this.getData()
	}

	public getData(): void {
		const cart: Cart = JSON.parse(this.localStorageService.getItem('cart') || 'null')
		if (cart) {
			this.cartItems = cart.products
		}
	}

	public getTotal(): number {
		return this.cartItems.reduce((acc, item) => acc + item.quantity * item.preProd, 0)
	}

	public updateQuantity(item: Items): void {
		if (item.quantity < 1) {
			item.quantity = 1
		}

		let localCart: Cart = JSON.parse(this.localStorageService.getItem('cart') || 'null')

		if (localCart) {
			const productInCart = localCart.products.find((p) => p.codProd === item.codProd)
			if (productInCart) {
				productInCart.quantity = item.quantity
				this.localStorageService.setItem('cart', JSON.stringify(localCart))
			}
		}
	}

	public increaseQuantity(item: Items): void {
		item.quantity++
		this.updateQuantity(item)
	}

	public decreaseQuantity(item: Items): void {
		if (item.quantity > 1) {
			item.quantity--
			this.updateQuantity(item)
		}
	}

	public removeFromCart(codProd: number): void {
		this.cartItems = this.cartItems.filter((cartItem) => cartItem.codProd !== codProd)

		let localCart: Cart = JSON.parse(this.localStorageService.getItem('cart') || 'null')

		if (localCart) {
			localCart.products = this.cartItems
			this.localStorageService.setItem(
				'cart',
				JSON.stringify({
					id: localCart.id,
					codUsu: localCart.codUsu,
					products: this.cartItems,
				}),
			)
		}
	}
}
