import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { LocalStorageService } from '../services/local-storage.service'

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private localStorageService: LocalStorageService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		const role = this.localStorageService.getItem('role')
		const token = this.localStorageService.getItem('token')
		if (token && role === 'admin') {
			return true
		}

		if (token && role === 'user') {
			this.router.navigate(['/product-listing'])
			return false
		}

		this.router.navigate(['/login'])
		return false
	}
}
