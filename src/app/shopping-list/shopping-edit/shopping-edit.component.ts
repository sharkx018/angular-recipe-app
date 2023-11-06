import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput') nameInput:ElementRef
  @ViewChild('amountInput') amountInput:ElementRef

  @Output() ingredientEmitter = new EventEmitter<Ingredient>()

  onAddBtnClicked(){
    this.ingredientEmitter.emit(
        {name: this.nameInput.nativeElement.value,
      amount:this.amountInput.nativeElement.value}
    )

    this.nameInput.nativeElement.value = ""
    this.amountInput.nativeElement.value = ""
  }

}
