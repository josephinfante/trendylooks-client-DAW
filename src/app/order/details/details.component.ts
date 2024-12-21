import { Component, OnInit } from '@angular/core'
import { Order } from '../../../types/order'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderService } from '../../services/order.service'
import { formatDate } from '../../../utils/format-date'
import { BackButtonDirective } from '../../directives/back-button.directive'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'order-details',
    imports: [BackButtonDirective],
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    standalone: true,
})
export class OrderDetailsComponent implements OnInit {
    orderId: number | null = null
    order: Order | null = null

constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
) {}

public ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params['id']
    this.getData()
}

public getData(): void {
    if (!this.orderId) return
    this.orderService.getOrderById(this.orderId).subscribe({
    next: (res) => {
        this.order = res.body as Order
    },
    error: (err) => {
        this.router.navigate(['/order'])
        this.toastr.error(err.error.message)
    },
    })
}

public formatDate = (date: string | undefined): string => formatDate(date)
}
