import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  editMode = false
  editedIdx:number = -1
  subscription: Subscription
  editedItem:Ingredient
  @ViewChild('f', {static: false}) slForm:NgForm

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((idx)=>{
      this.editMode = true;
      this.editedIdx = idx
      this.editedItem = this.shoppingListService.getIngredient(idx)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,

      })
    })
  }

  onAddBtnClicked(shoppingEditForm: NgForm){

    if (this.editMode){
      this.shoppingListService.updateIngredient(this.editedIdx, shoppingEditForm.value.name, shoppingEditForm.value.amount)
    }else{
      let ingredient = new Ingredient(shoppingEditForm.value.name, shoppingEditForm.value.amount)
      this.shoppingListService.addIngredients(ingredient)
    }

    this.onClear()

  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIdx)
    this.onClear()
  }

  onClear(){
    this.editMode = false
    this.slForm.reset()
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
