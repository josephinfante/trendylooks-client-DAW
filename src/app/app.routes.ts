import { Routes } from '@angular/router'
import { ProductComponent } from './product/product.component'
import { ProductDetailsComponent } from './product/details/details.component'
import { ProductEditComponent } from './product/edit/edit.component'
import { LoginComponent } from './login/login.component'
import { ProductListingComponent } from './client/product-listing/product-listing.component'
import { AuthGuard } from './guards/auth.guard'
import { AdminGuard } from './guards/admin.guard'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { CartComponent } from './client/cart/cart.component'
import { CheckoutComponent } from './client/checkout/checkout.component'

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },

	// admin routes
	{ path: 'product', component: ProductComponent, canActivate: [AdminGuard] },
	{ path: 'product/create', component: ProductEditComponent, canActivate: [AdminGuard] },
	{ path: 'product/:id', component: ProductDetailsComponent, canActivate: [AdminGuard] },
	{ path: 'product/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard] },

	// client routes
	{ path: 'product-listing', component: ProductListingComponent },
	{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
	{ path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
]
