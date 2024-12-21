import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Order } from '../../../types/order'

@Component({
	selector: 'app-orders',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
	orders: Order[] = [
		{
			codPed: 1,
			codUsu: 101,
			totPed: 120.5,
			contPed: 'Juan Perez',
			telPed: '123456789',
			dirPed: 'Av. Principal 123',
			estPed: 'Enviado',
			fecPed: '2024-12-01',
		},
		{
			codPed: 2,
			codUsu: 101,
			totPed: 80.0,
			contPed: 'Maria Lopez',
			telPed: '987654321',
			dirPed: 'Calle Secundaria 456',
			estPed: 'Pendiente',
			fecPed: '2024-12-02',
		},
	]
	constructor(private router: Router) {}

	public ngOnInit(): void {
		// In a real app, you would fetch the orders from a backend service
	}

	public viewDetails(codPed: number): void {
		// Navigate to the order details page (assuming you have a route for it)
		this.router.navigate(['/order-details', codPed])
	}
}
