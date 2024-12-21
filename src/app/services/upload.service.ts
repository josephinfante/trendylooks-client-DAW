import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

export interface CloudinaryResponse {
	asset_folder: string
	asset_id: string
	bytes: number
	created_at: string
	display_name: string
	etag: string
	format: string
	height: number
	original_filename: string
	placeholder: boolean
	public_id: string
	resource_type: string
	secure_url: string
	signature: string
	tags: string[]
	type: string
	url: string
	version: number
	version_id: string
	width: number
}

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	private readonly cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dwxrovwfn/upload'
	private readonly uploadPreset = 'angular-daw'

	constructor(private http: HttpClient) {}

	uploadFile(file: File): Observable<CloudinaryResponse> {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', this.uploadPreset)

		return this.http.post(this.cloudinaryUrl, formData) as Observable<CloudinaryResponse>
	}
}
