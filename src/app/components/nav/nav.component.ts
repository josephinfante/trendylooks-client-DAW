import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from '../../services/local-storage.service'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { filter } from 'rxjs'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [CommonModule, RouterModule, FontAwesomeModule],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
	faShoppingCart = faShoppingCart
	userRole: string | null = null
	user: { codUsu: number; nomUsu: string; apeUsu: string; correoUsu: string } | null = null

	adminRoutes = [
		{ path: '/dashboard', label: 'Dashboard' },
		{ path: '/user', label: 'Usuarios' },
		{ path: '/product', label: 'Productos' },
		{ path: '/category', label: 'Categorias' },
		{ path: '/cart-detail', label: 'Detalles de carrito' },
		{ path: '/order', label: 'Pedidos' },
	]

	clientRoutes = [{ path: '/product-listing', label: 'Productos' }]

	constructor(private localStorageService: LocalStorageService, private router: Router) {}

	ngOnInit(): void {
		this.loadUserData()

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.loadUserData()
		})
	}

	loadUserData(): void {
		this.userRole = this.localStorageService.getItem('role')
		const userString = this.localStorageService.getItem('user')
		this.user = userString ? JSON.parse(userString) : null
	}

	isLoggedIn(): boolean {
		return !!this.localStorageService.getItem('token')
	}

	logout(): void {
		this.localStorageService.clear()
		this.router.navigate(['/login'])
	}
}
