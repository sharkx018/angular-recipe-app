import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";
import {Subject} from "rxjs";

export class ShoppingListService{

    ingredientChanged = new Subject<Ingredient[]>()

    private ingredients:Ingredient[] = [
        new Ingredient("Tomato", 2),
        new Ingredient("Potato", 2),
        new Ingredient("Eggs", 4),
    ]

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    addManyIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientChanged.next(this.ingredients.slice())
    }

}