import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService{

    private recipes : Recipe[] = [
        new Recipe('A Test Recipe 1',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU'),
        new Recipe('A Test Recipe 2',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU'),
        new Recipe('A Test Recipe 3',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU')
    ];

    recipeSelected = new EventEmitter<Recipe>()

    getRecipes(){
        return this.recipes.slice()
    }

    onRecipeSelected(recipe: Recipe){
        this.recipeSelected.emit(recipe)
    }

}