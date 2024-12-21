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
import { UserComponent } from './user/user.component'
import { UserDetailsComponent } from './user/details/details.component'
import { UserEditComponent } from './user/edit/edit.component'
import { CategoryComponent } from './category/category.component'
import { CategoryEditComponent } from './category/edit/edit.component'
import { CategoryDetailsComponent } from './category/details/details.component'
import { CartDetailComponent } from './cart-detail/cart-detail.component'
import { CartDetailEditComponent } from './cart-detail/edit/edit.component'
import { CartDetailDetailsComponent } from './cart-detail/details/details.component'
import { OrderComponent } from './order/order.component'
import { OrderEditComponent } from './order/edit/edit.component'
import { OrderDetailsComponent } from './order/details/details.component'
import { SettingsComponent } from './client/settings/settings.component'
import { OrdersComponent } from './client/orders/orders.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DashboardCardComponent } from './dashboard/dashboard-card/dashboard-card.component'

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },

	// admin routes
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
	{ path: 'dashboard-card', component: DashboardCardComponent, canActivate: [AdminGuard] },

	{ path: 'user', component: UserComponent, canActivate: [AdminGuard] },
	{ path: 'user/create', component: UserEditComponent, canActivate: [AdminGuard] },
	{ path: 'user/:id', component: UserDetailsComponent, canActivate: [AdminGuard] },
	{ path: 'user/edit/:id', component: UserEditComponent, canActivate: [AdminGuard] },

	{ path: 'product', component: ProductComponent, canActivate: [AdminGuard] },
	{ path: 'product/create', component: ProductEditComponent, canActivate: [AdminGuard] },
	{ path: 'product/:id', component: ProductDetailsComponent, canActivate: [AdminGuard] },
	{ path: 'product/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard] },

	{ path: 'category', component: CategoryComponent, canActivate: [AdminGuard] },
	{ path: 'category/create', component: CategoryEditComponent, canActivate: [AdminGuard] },
	{ path: 'category/:id', component: CategoryDetailsComponent, canActivate: [AdminGuard] },
	{ path: 'category/edit/:id', component: CategoryEditComponent, canActivate: [AdminGuard] },

	{ path: 'cart-detail', component: CartDetailComponent, canActivate: [AdminGuard] },
	{ path: 'cart-detail/create', component: CartDetailEditComponent, canActivate: [AdminGuard] },
	{ path: 'cart-detail/:id', component: CartDetailDetailsComponent, canActivate: [AdminGuard] },
	{ path: 'cart-detail/edit/:id', component: CartDetailEditComponent, canActivate: [AdminGuard] },

	{ path: 'order', component: OrderComponent, canActivate: [AdminGuard] },
	{ path: 'order/create', component: OrderEditComponent, canActivate: [AdminGuard] },
	{ path: 'order/:id', component: OrderDetailsComponent, canActivate: [AdminGuard] },
	{ path: 'order/edit/:id', component: OrderEditComponent, canActivate: [AdminGuard] },

	// client routes
	{ path: 'product-listing', component: ProductListingComponent },
	{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
	{ path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
]
