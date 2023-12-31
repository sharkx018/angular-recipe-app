import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  ingredients:Ingredient[] = []


  constructor(private shoppingListService: ShoppingListService) {

  }

    ngOnInit() {
      this.ingredients = this.shoppingListService.getIngredients()

      // listen to each time if the ingredient list is changed
      this.shoppingListService.ingredientChanged.subscribe((ingredient:Ingredient[])=>{
        this.ingredients = ingredient
      })
    }

  onEditItem(idx: number){
    this.shoppingListService.startedEditing.next(idx)
  }




}
