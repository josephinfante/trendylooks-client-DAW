import { Injectable } from '@angular/core'
import { HttpApiService } from './http-api.service'
import { User } from '../../types/user'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(protected http: HttpApiService) {}

	createUser(user: User) {
		return this.http.post('api/user', user)
	}

	loginUser(email: string, password: string) {
		return this.http.post('api/user/login', { email, password })
	}
}
