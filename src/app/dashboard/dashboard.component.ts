import { Component } from '@angular/core';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { CommonModule } from '@angular/common';
import { DashboardCardData } from '../../types/dashboard-card-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faList, faUser, faBox, faCartShopping, faClipboardList, faBagShopping, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
	faUser = faUser
	faCategory = faList
	faProduct = faBox
  faCart = faCartShopping
  faCartDetail = faClipboardList
  faOrder = faBagShopping
  faOrderDetail = faClipboardCheck

  cards: DashboardCardData[] = [
    {
      title: 'Usuarios',
      content: 'Información de los usuarios',
      total: 10,
      active: 10,
      image: faUser,
      link1: '/user',
      link2: '/user/create',    
      colorClass: 'bg-primary',
      textColor: 'text-white',    
      tableColor: 'table-primary',
      iconColor: 'text-primary'
    },
    {
      title: 'Categorías',
      content: 'Detalles de categorías',
      total: 10,
      active: 10,
      image: faList,
      link1: '/category',
      link2: '/category/create',   
      colorClass: 'bg-warning',
      textColor: 'text-white',    
      tableColor: 'table-warning',
      iconColor: 'text-warning'
    },
    {
      title: 'Productos',
      content: 'Información sobre productos',
      total: 10,
      active: 10,
      image: faBox,
      link1: '/product',
      link2: '/product/create',
      colorClass: 'bg-success',
      textColor: 'text-white',    
      tableColor: 'table-success',
      iconColor: 'text-success'
    },
    {
      title: 'Carritos',
      content: 'Detalles de carritos',
      total: 10,
      active: 10,
      image: faCartShopping,
      link1: '/cart',
      link2: '/cart/create',
      colorClass: 'bg-info',
      textColor: 'text-white',    
      tableColor: 'table-info',
      iconColor: 'text-info'
    },
    {
      title: 'Detalles Carritos',
      content: 'Información de detalles carritos',
      total: 10,
      active: 10,
      image: faClipboardList,
      link1: '/cart-detail',
      link2: '/cart-detail/create',
      colorClass: 'bg-dark',
      textColor: 'text-white',    
      tableColor: 'table-dark',
      iconColor: 'text-dark'
    },
    {
      title: 'Pedidos',
      content: 'Información de pedidos',
      total: 10,
      active: 10,
      image: faBagShopping,
      link1: '/order',
      link2: '/order/create',
      colorClass: 'bg-danger',
      textColor: 'text-white',    
      tableColor: 'table-danger',
      iconColor: 'text-danger'
    },
    {
      title: 'Detalles Pedidos',
      content: 'Información de detalles pedidos',
      total: 10,
      active: 10,
      image: faClipboardCheck,
      link1: '/order-detail',
      link2: '/order-detail/create',
      colorClass: 'bg-secondary',
      textColor: 'text-white',    
      tableColor: 'table-secondary',
      iconColor: 'text-secondary'
    }
  ];
}