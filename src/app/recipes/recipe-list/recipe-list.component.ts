import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output() recipeSelected  = new EventEmitter<Recipe>()

  recipes : Recipe[] = [
      new Recipe('A Test Recipe 1',
          'This is simply a test',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU'),
    new Recipe('A Test Recipe 2',
        'This is simply a test',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU'),
    new Recipe('A Test Recipe 3',
        'This is simply a test',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrXnVVt766jPFKXdsUeZGeoC5_JqAOHLQSw&usqp=CAU')
  ];

  onRecipeItemSelected(recipe: Recipe){
    // console.log("Clicked!!!", recipe)
    this.recipeSelected.emit(recipe)
  }


}
