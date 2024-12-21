import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class HttpApiService {
	protected baseUrl: string

	constructor(private http: HttpClient) {
		this.baseUrl = 'https://1pjzxhwc-8080.brs.devtunnels.ms'
	}

	get<T>(endpoint: string): Observable<HttpResponse<T>> {
		return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { observe: 'response' })
	}

	post<T>(endpoint: string, body: any): Observable<HttpResponse<T>> {
		return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { observe: 'response' })
	}

	put<T>(endpoint: string, body: any): Observable<HttpResponse<T>> {
		return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { observe: 'response' })
	}

	delete<T>(endpoint: string): Observable<HttpResponse<T>> {
		return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { observe: 'response' })
	}
}
