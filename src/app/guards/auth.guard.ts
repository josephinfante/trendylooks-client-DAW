import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { LocalStorageService } from '../services/local-storage.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private localStorageService: LocalStorageService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		const token = this.localStorageService.getItem('token')

		if (token) {
			if (next.routeConfig?.path === 'login') {
				this.router.navigate(['/product-listing'])
				return false
			}
			return true
		}

		if (next.routeConfig?.path !== 'login' && next.routeConfig?.path !== 'register') {
			this.router.navigate(['/login'])
			return false
		}

		return true
	}
}
