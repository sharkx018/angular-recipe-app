import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput') nameInput:ElementRef
  @ViewChild('amountInput') amountInput:ElementRef

  constructor(private shoppingListService: ShoppingListService) {
  }

  onAddBtnClicked(){

    let ingredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value)
    this.shoppingListService.addIngredients(ingredient)

    // reset the field
    this.nameInput.nativeElement.value = ""
    this.amountInput.nativeElement.value = ""
  }

}
