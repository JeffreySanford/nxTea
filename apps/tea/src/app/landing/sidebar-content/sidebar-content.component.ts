import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tea } from '@tea/api-interfaces';
import { CartService } from '../../common/services/cart.service';
import { DashboardService } from '../../common/services/dashboard.service';
import { SidebarService } from '../../common/services/sidebar.service';

@Component({
  selector: 'tea-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  @Input() cart?: Array<Tea>;
  totalCartItems = 0;
  currentUser = {
    name: 'Billy Jones',
    id: 0
  }
  itemsInCart = 0;
  cartService: CartService;
  cd: ChangeDetectorRef;
  displayedColumns = ['name', 'price', 'sub-totals', 'actions'];
  cartItemsDisplay: boolean = false;
  dataSource = new MatTableDataSource<Tea>();
  sidebarService: SidebarService;
  dashboard: DashboardService;
  opened = false;
  isAction = false;

  constructor(
    cartService: CartService, 
    cd: ChangeDetectorRef, 
    sidebarService: SidebarService,
    dashboard: DashboardService,
    private router: Router
    ) {
    this.cartService = cartService;
    this.cd = cd;
    this.sidebarService = sidebarService;
    this.dashboard = dashboard;
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: Tea[]) => {
      this.cart = cart;
      this.dataSource.data = this.cart;
      this.totalCartItems = this.cartService.getTotalCartItems();
      // cart.length > 0 ? this.toggleCartItems(true) : this.toggleCartItems(false)
      this.cd.detectChanges();
    });
  }

  viewUser() {
    this.router.navigate(['/user']);
  }

  viewStage() {
    this.router.navigate(['/stage']);

  }

  viewSubscriptions() {
    this.router.navigate(['/subscriptions']);

  }

  viewHelp() {
    this.router.navigate(['/help']);

  }

  toggleSidebar(action: string, isOpen: boolean) {
    debugger
    if (action === 'toggle' && !this.isAction) {
      this.sidebarService.toggleSidebar(isOpen).subscribe((isOpen) => this.opened = isOpen);
  }
  else {
      debugger;
      this.isAction = false;
  }
}


  toggleCartItems(isCartOpened: boolean) {
    this.cartItemsDisplay = isCartOpened ? true : false;
    this.sidebarService.toggleSidebar(this.cartItemsDisplay).subscribe();
    this.cd.detectChanges();
  }

  getTotal(): number {
    let currentTotal = 0;
    this.cart?.forEach((tea: Tea) => {
      currentTotal = currentTotal + (tea.price * tea.orderQuantity);
    });

    return currentTotal;
  }

  showCartItems(showCart: boolean): void {
    this.cartItemsDisplay = showCart;
  }

  checkout(): void {
    this.dashboard.isDashboardOpen(false).subscribe();
  }

  addToCart(id: number, addition: boolean): void {
    console.log('add to cart', id, addition)
    this.cartService.addToCart(id, addition);
    this.cartService.getCart().subscribe((cart: Tea[]) => {
      this.cart = cart;
      this.sidebarService.toggleSidebar(false).subscribe();
      this.totalCartItems = this.cartService.getTotalCartItems();
      this.cd.detectChanges();
    });
  }
}
