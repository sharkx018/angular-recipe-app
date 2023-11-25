import {NgModule} from "@angular/core";
import {PreloadAllModules, PreloadingStrategy, RouterModule, Routes} from "@angular/router";

const appRoutes:Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch:"full"
    },
    {
        path:'recipes',
        // loadChildren:'./recipes/recipe-module/recipe.module#RecipeModule'
        loadChildren:()=> import('./recipes/recipe-module/recipe.module').then(m => m.RecipeModule)
    },
    {
        path:'shopping-list',
        // loadChildren:'./recipes/recipe-module/recipe.module#RecipeModule'
        loadChildren:()=> import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    {
        path:'auth',
        // loadChildren:'./recipes/recipe-module/recipe.module#RecipeModule'
        loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
    },
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}
