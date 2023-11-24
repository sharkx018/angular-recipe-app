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
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    // DropdownDirective, // once components are declared in some module, then individual components cannot be declared instead module which contains the components needs to be imported
    // LoadingSpinnerComponent,
    // AlertComponent
  ],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecipeModule,
        ShoppingListModule,
        SharedModule,
        CoreModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
