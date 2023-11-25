import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgOptimizedImage } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeModule } from "./recipes/recipe-module/recipe.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // DropdownDirective, // once components are declared in some module, then individual components cannot be declared instead module which contains the components needs to be imported
    // LoadingSpinnerComponent,
    // AlertComponent
  ],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        CoreModule,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
