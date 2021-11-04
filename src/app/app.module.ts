import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import "@angular/compiler";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {Header3Component } from './header3/header3.component';
import {Footer2Component} from './footer2/footer2.component';
import { LoadingComponent } from './loading/loading.component';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MenuComponent,
    MenuItemComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    Header3Component,
    Footer2Component,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard]},
      {path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
      {path: 'menu', component: MenuComponent, canActivate:[AuthGuard]},
      {path: '**', redirectTo: 'login'}
    ]),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
