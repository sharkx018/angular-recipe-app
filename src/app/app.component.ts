import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-recipe-app';

  RECIPE_HEADER = "recipe_header"
  SHOPPING_LIST_HEADER = "shopping_list_header"

  CURRENT_HEADER: string= this.RECIPE_HEADER

  onHeaderClicked(header: string){
    this.CURRENT_HEADER = header
  }

}
