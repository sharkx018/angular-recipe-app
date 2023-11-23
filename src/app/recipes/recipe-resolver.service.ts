import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable} from "rxjs";
// @ts-ignore
import Promise from "$GLOBAL$";
import {DataStorageService} from "../shared/data-storage.service";
import {Injectable} from "@angular/core";


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot) {

        return this.dataStorageService.fetchRecipes()

    }

}
