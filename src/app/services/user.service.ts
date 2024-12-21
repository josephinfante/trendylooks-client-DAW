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

	updateUser(id: number, user: Partial<User>) {
		return this.http.put(`api/user`, { codUsu: id, ...user })
	}

	getAllUsers(pageNumber: number, pageSize: number) {
		return this.http.get(`api/user?page=${pageNumber}&size=${pageSize}`)
	}

	getUserById(id: number) {
		return this.http.get(`api/user/${id}`)
	}

	loginUser(email: string, password: string) {
		return this.http.post('api/user/login', { email, password })
	}
}
