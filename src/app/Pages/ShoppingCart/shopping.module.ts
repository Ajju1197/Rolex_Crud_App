import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CartComponent } from './cart/cart.component';
import { HoverCardComponent } from './hover-card/hover-card.component';
import { AppModulesModule } from 'src/app/shared/sharedModules/app-modules/app-modules.module';
import { MeterialModule } from 'src/app/shared/sharedModules/meterial/meterial.module';


@NgModule({
    declarations: [
        ProductsComponent,
        ProductViewComponent,
        CartComponent,
        HoverCardComponent,
    ],
    imports: [
    CommonModule,
    ShoppingRoutingModule,
    AppModulesModule,
    MeterialModule
  ],
    exports:[]
})
export class ShoppingModule {
  constructor() {
    console.log('Products Modules Loaded');
    
  }
 }
