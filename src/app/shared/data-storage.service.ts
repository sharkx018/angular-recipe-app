import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Secrets} from "./secrets";

@Injectable({providedIn:'root'})
export class DataStorageService{

    // BASE_RECIPE_URL = "https://angular-recipe-app-275b0-default-rtdb.firebaseio.com/recipes.json"
    secrets = new Secrets()

    constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        return this.httpClient
            .put(
                this.secrets.BASE_RECIPE_URL,
                recipes
            )
            .subscribe((response)=>{
                console.log("ppp",response)
            }, (error)=>{
                console.log(error)
            })
    }

}
