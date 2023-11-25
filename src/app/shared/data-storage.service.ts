import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {environment} from "../../environment/environment";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{

    // BASE_RECIPE_URL = "https://angular-recipe-app-275b0-default-rtdb.firebaseio.com/recipes.json"
    // secrets = new Secrets()

    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        return this.httpClient
            .put(
                environment.BASE_RECIPE_URL,
                recipes
            )
            .subscribe((response)=>{
                console.log("ppp",response)
            }, (error)=>{
                console.log(error)
            })
    }

    fetchRecipes(){

        return this.httpClient
            .get< Recipe[] >(
                environment.BASE_RECIPE_URL
            )
            .pipe(map(recipes=>{

                // Checking if empty ingredients is null or not, if it is null, assign the empty array
                return recipes.map(recipe=>{
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                })

            }), tap(data=>{
                this.recipeService.setRecipes(data)
            }))

        // exhaustMap: it basically chains the observable, that is it waits for the authService.user to complete and then chain up the httpClient observable
        return this.authService.user
            .pipe(take(1), exhaustMap((user)=>{
                return this.httpClient
                        .get< Recipe[] >(
                            environment.BASE_RECIPE_URL,{
                                params: new HttpParams().set('auth', user.token)
                            }
                        )
            }))
            .pipe(map(recipes=>{

                // Checking if empty ingredients is null or not, if it is null, assign the empty array
                return recipes.map(recipe=>{
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                })

            }), tap(data=>{
                this.recipeService.setRecipes(data)
            }))

            // .subscribe((recipes)=>{
            //     this.recipeService.setRecipes(recipes)
            //     console.log(recipes)
            // })
    }

}
