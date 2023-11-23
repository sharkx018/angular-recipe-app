import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable, tap} from "rxjs";
// @ts-ignore
import Promise from "$GLOBAL$";
import {DataStorageService} from "../shared/data-storage.service";
import {Injectable} from "@angular/core";
import {RecipeService} from "./recipe.service";


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService,
                private router: Router,
                private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot,) {

        const recipes = this.recipeService.getRecipes()
        if (recipes.length != 0){
            return recipes
        }


        return this.dataStorageService.fetchRecipes()
            .pipe(
                tap((recipes)=>{
                    const isFound = recipes.findIndex((recipe)=>{
                        return recipe.id === +route.params['id']
                    })

                    if (isFound == -1) {
                        this.router.navigate(['recipes'])
                    }
                })
            )

    }

}
