import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  editMode = false
  recipeID: number
  recipe: Recipe

  constructor(private route:ActivatedRoute,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.editMode = params['id'] != null;
      this.recipeID = +params['id']
    })
    this.recipe = this.recipeService.getRecipeByID(+this.recipeID)
    console.log(this.recipe)
  }

}
