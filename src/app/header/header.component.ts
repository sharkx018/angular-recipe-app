import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  RECIPE_HEADER = "recipe_header"
  SHOPPING_LIST_HEADER = "shopping_list_header"

  @Output() headerEmitter = new EventEmitter<string>()

  onSelect(header: string){
    this.headerEmitter.emit(header)
  }

}
