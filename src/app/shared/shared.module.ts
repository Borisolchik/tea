import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from "./layout/header/header.component";
import {AdvantagePipe} from "./pipes/advantage.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ProductCardComponent} from "./product-card/product-card.component";

@NgModule({
  declarations: [
    ProductCardComponent,
    FooterComponent,
    HeaderComponent,
    AdvantagePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ProductCardComponent,
    FooterComponent,
    HeaderComponent,
    AdvantagePipe
  ]
})
export class SharedModule { }
