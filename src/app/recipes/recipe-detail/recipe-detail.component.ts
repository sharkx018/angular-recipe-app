import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  // @Input() currentRecipe :Recipe
  currentRecipe :Recipe
  recipeId: number

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    // via component init
    this.recipeId = this.route.snapshot.params['id']
    this.currentRecipe = this.recipeService.getRecipeByID(this.recipeId)

    // via observable
    this.route.params.subscribe((params)=>{
      this.recipeId = +params['id']
       this.currentRecipe = this.recipeService.getRecipeByID(this.recipeId)
    })
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['../'], {relativeTo:this.route})
  }

  addIngredientsToShoppingList(){
    this.recipeService.onAddIngredients(this.currentRecipe.ingredients)
  }
}
