import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from '../../services/local-storage.service'
import { User } from '../../../types/user'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons'

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
	user: User | null = null
	totalPrice: number = 0
	checkoutForm: FormGroup
	cardTypeIcon = faCcVisa
	cardNumberMaxLength = 19

	constructor(
		private formBuilder: FormBuilder,
		private toastr: ToastrService,
		private localStorageService: LocalStorageService,
	) {
		this.checkoutForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			address: ['', [Validators.required]],
			creditCard: ['', [Validators.required]],
			expiryDate: ['', [Validators.required]],
			cvv: ['', [Validators.required]],
		})
	}

	public ngOnInit(): void {
		this.getUserData()
		this.getTotal()
	}

	public getUserData(): void {
		const localUser = JSON.parse(this.localStorageService.getItem('user') || 'null')
		if (localUser !== null) {
			this.user = localUser
			this.checkoutForm.get('name')?.patchValue(localUser.nomUsu + ' ' + localUser.apeUsu)
		}
	}

	public getTotal(): void {
		const localCart = JSON.parse(this.localStorageService.getItem('cart') || 'null')
		this.totalPrice = localCart
			? localCart.products.reduce((acc: any, item: any) => acc + item.preProd * item.quantity, 0)
			: 0
	}

	public onCardNumberInput(): void {
		const cardNumber = this.checkoutForm.get('creditCard')?.value

		this.cardTypeIcon = this.getCardTypeIcon(cardNumber)
		this.checkoutForm.patchValue({
			creditCard: this.formatCardNumber(cardNumber),
		})
	}

	public getCardTypeIcon(cardNumber: string): any {
		const firstDigit = cardNumber?.charAt(0)

		if (firstDigit === '4') {
			this.cardNumberMaxLength = 19
			return faCcVisa
		} else if (firstDigit === '5') {
			this.cardNumberMaxLength = 19
			return faCcMastercard
		}

		return faCcVisa
	}

	public formatCardNumber(cardNumber: string): string {
		const digitsOnly = cardNumber.replace(/\D/g, '')

		if (digitsOnly.length <= 16) {
			return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ')
		}

		return cardNumber
	}

	public onSubmit(): void {}
}
