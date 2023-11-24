import {NgModule} from "@angular/core";
import {RecipesComponent} from "../recipes.component";
import {RecipeListComponent} from "../recipe-list/recipe-list.component";
import {RecipeItemComponent} from "../recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "../recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "../recipe-start/recipe-start.component";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RecipeRoutingModule} from "./recipe-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        RecipeRoutingModule,
        SharedModule
    ],
    // we can we remove it safely becoz the components are being used internally via recipe routing module only , so no need to expose them
    // exports:[
    //     RecipesComponent,
    //     RecipeListComponent,
    //     RecipeItemComponent,
    //     RecipeDetailComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    // ]
})
export  class RecipeModule{

}
