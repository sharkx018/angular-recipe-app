import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService{

    private recipes : Recipe[] = [
        new Recipe('A Test Recipe 1',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU',
            [
                new Ingredient("Meat", 2),
                new Ingredient("Bread", 1)
            ]),
        new Recipe('A Test Recipe 2',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU',
            [
                new Ingredient("Apple", 1),
                new Ingredient("Honey", 3)
            ]),
        new Recipe('A Test Recipe 3',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU',
            [
                new Ingredient("Tea", 1),
                new Ingredient("Bread", 5)
            ])
    ];

    recipeSelected = new EventEmitter<Recipe>()

    getRecipes(){
        return this.recipes.slice()
    }

    onRecipeSelected(recipe: Recipe){
        this.recipeSelected.emit(recipe)
    }

}