import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  // @Output() recipeSelected  = new EventEmitter<Recipe>()
  recipes : Recipe[] = [];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
    this.recipes = recipeService.getRecipes()
  }


  onRecipeItemSelected(recipe: Recipe){
    // console.log("Clicked!!!", recipe)
    // this.recipeSelected.emit(recipe)
    this.recipeService.onRecipeSelected(recipe)
  }

  onRecipeItemNavigate(recipe: Recipe){
    this.router.navigate([recipe.id], {relativeTo:this.route})

  }



}
