import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{

    recipesEmitter = new Subject<Recipe[]>()
    constructor(private shoppingListService: ShoppingListService) {
    }

    private recipes : Recipe[] = [
        // new Recipe(1, 'A Test Recipe 1',
        //     'This is simply a test',
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU',
        //     [
        //         new Ingredient("Meat", 2),
        //         new Ingredient("Bread", 1)
        //     ]),
        // new Recipe(2,'A Test Recipe 2',
        //     'This is simply a test',
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU',
        //     [
        //         new Ingredient("Apple", 1),
        //         new Ingredient("Honey", 3)
        //     ]),
        // new Recipe(3, 'A Test Recipe 3',
        //     'This is simply a test',
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU',
        //     [
        //         new Ingredient("Tea", 1),
        //         new Ingredient("Bread", 5)
        //     ])
    ];

    recipeSelected = new EventEmitter<Recipe>()

    getRecipes(){
        return this.recipes.slice()
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes
        this.recipesEmitter.next(this.recipes.slice())
    }

    onRecipeSelected(recipe: Recipe){
        this.recipeSelected.emit(recipe)
    }

    onAddIngredients(ingredients: Ingredient[]){
        this.shoppingListService.addManyIngredients(ingredients)

    }

    getRecipeByID(id: number){

        console.log("recipeService", this.recipes, id)
        const r = this.recipes.find((recipe)=>{
            return recipe.id === id
        })

        return r

    }

    addRecipe(recipe: Recipe){
        recipe.id = this.recipes.length+1
        this.recipes.push(recipe)
        this.recipesEmitter.next(this.recipes.slice())
    }

    updateRecipe(id: number, newRecipe: Recipe) {

        let idx = this.recipes.findIndex((recipe)=>{
            return recipe.id === id
        })

        this.recipes[idx] = newRecipe

    }

    deleteRecipe(recipeId: number) {
        const idx = this.recipes.findIndex((recipe)=>{
            return recipe.id === recipeId
        })
        this.recipes.splice(idx, 1)
        this.recipesEmitter.next(this.recipes.slice())
    }
}
