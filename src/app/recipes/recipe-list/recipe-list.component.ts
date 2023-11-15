import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  // @Output() recipeSelected  = new EventEmitter<Recipe>()
  recipes : Recipe[] = [];
  subscription: Subscription

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
    this.recipes = recipeService.getRecipes()

    this.subscription = this.recipeService.recipesEmitter.subscribe((recipes)=>{
      this.recipes = recipes
    })
  }

  ngOnInit() {
    // this.recipeService.recipesEmitter.subscribe((recipes)=>{
    //   this.recipes = recipes
    // })
  }


  onRecipeItemSelected(recipe: Recipe){
    // console.log("Clicked!!!", recipe)
    // this.recipeSelected.emit(recipe)
    this.recipeService.onRecipeSelected(recipe)
  }

  onRecipeItemNavigate(recipe: Recipe){
    this.router.navigate([recipe.id], {relativeTo:this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
