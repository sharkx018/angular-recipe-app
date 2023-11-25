import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

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
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}
