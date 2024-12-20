import { Routes } from '@angular/router'
import { ProductComponent } from './product/product.component'
import { ProductDetailsComponent } from './product/details/details.component'
import { ProductEditComponent } from './product/edit/edit.component'
import { LoginComponent } from './login/login.component'

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'product', component: ProductComponent },
	{ path: 'product/create', component: ProductEditComponent },
	{ path: 'product/:id', component: ProductDetailsComponent },
	{ path: 'product/edit/:id', component: ProductEditComponent },
]
