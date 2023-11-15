import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";
import {Subject} from "rxjs";

export class ShoppingListService{

    ingredientChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<number>()

    private ingredients:Ingredient[] = [
        new Ingredient("Tomato", 2),
        new Ingredient("Potato", 2),
        new Ingredient("Eggs", 4),
    ]

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index]
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, name: string, amount: number){
         this.ingredients[index].name = name
         this.ingredients[index].amount = amount
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
