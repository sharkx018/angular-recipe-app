import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgOptimizedImage } from "@angular/common";
import { DropdownDirective } from "./shared/dropdown.directive";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeService } from "./recipes/recipe.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AlertComponent} from "./shared/alert/alert.component";
import {RecipeModule} from "./recipes/recipe-module/recipe.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecipeModule,
        ShoppingListModule
    ],
  providers: [
      ShoppingListService,
      RecipeService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass:AuthInterceptorService,
          multi:true,
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
