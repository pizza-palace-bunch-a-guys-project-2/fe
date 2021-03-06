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
import { MiniGameComponent } from './mini-game/mini-game.component';
import { EditUserComponent } from './edit-user/edit-user.component';


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
    LoadingComponent,
    MiniGameComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'header3', component:Header3Component},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuard]},
      // {path: 'cart', component: CartComponent}, // keep for now demo then place in menu route once merged and use as modal
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

