import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tea, User } from '@tea/api-interfaces';
import { CartService } from '../common/services/cart.service';
import { InventoryService } from '../common/services/inventory.service';
import { SidebarService } from '../common/services/sidebar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DashboardService } from '../common/services/dashboard.service';
import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'tea-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  opened: BooleanInput = true;
  color = "green";
  showCartItems = false;
  inventory: Tea[] = [];
  currentTea: Tea = {
    name: '',
    price: 0,
    cost: 0,
    id: 0,
    orderQuantity: 0,
    image: 'assets/teas/default-tea-container-image.png'
  }

  totalCartItems = 0;
  cart?: Tea[];
  cartService: CartService;
  sidebarService: SidebarService;
  cartItems: Tea[] = [];
  dashboard = false;
  checkout = false;
  isAction = true;
  isUserLoggedIn=  false;
  user?: User;

  constructor(
    sidebarService: SidebarService,
    cartService: CartService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService
  ) {
    this.cartService = cartService;
    this.sidebarService = sidebarService;
  }

  ngOnInit(): void {
    this.dashboardService.isDashboardOpen(this.dashboard).subscribe((next) => {
      this.dashboard = next ? true : false;
      this.checkout = next ? false : true;
      this.cd.detectChanges();
      this.authenticationService.currentUser?.subscribe((user: User)=>{
        this.isUserLoggedIn = true;
        this.user = user;
      },(error)=>{console.log(error.message)})
    
    });

    this.cartService.getCart().subscribe((cart: Tea[]) => {
      this.cart = cart;
      this.totalCartItems = this.cartService.getTotalCartItems();
      this.cd.detectChanges();
    });
  }

  viewUser() {
    this.isAction = false;
    this.router.navigate(['/user']);
  }

  viewStage() {
    this.isAction = false;
    this.router.navigate(['/stage']);
  }

  viewSubscriptions() {
    this.isAction = false;
    this.router.navigate(['/subscriptions']);

  }

  viewHelp() {
    this.isAction = false;
    this.router.navigate(['/help']);

  }

  toggleSidebar(action: string, isOpen: boolean, isAction: boolean) {

    if (action === 'toggle' && !this.isAction) {
      this.sidebarService.toggleSidebar(isOpen).subscribe((isOpen: boolean) => {
        console.log('landing toggle sidebar trigger')
        this.opened = isOpen
      });
    } else {
      console.log('landing toggle sidebar trap');
      this.isAction = false;
    }
  }
}
