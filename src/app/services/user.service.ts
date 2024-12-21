import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(protected http: HttpApiService) {}

	loginUser(email: string, password: string) {
		return this.http.post('api/user/login', { email, password })
	}
}
