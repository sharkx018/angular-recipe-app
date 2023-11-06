import { Component } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  ingredients:Ingredient[] = [
      new Ingredient("Tomato", 2),
      new Ingredient("Potato", 2),
      new Ingredient("Eggs", 4),
  ]

  constructor() {
  }

  setIngredients(ingredient: Ingredient){
      this.ingredients.push(ingredient)
  }


}
