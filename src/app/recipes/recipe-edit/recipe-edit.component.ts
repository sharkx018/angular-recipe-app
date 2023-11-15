import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {FormArray, FormArrayName, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  editMode = false
  recipeID: number
  recipe: Recipe
  recipeForm: FormGroup

  constructor(private route:ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {}

  ngOnInit() {


    this.route.params.subscribe((params)=>{
      this.editMode = params['id'] != null;
      this.recipeID = +params['id']
      this.recipe = this.recipeService.getRecipeByID(+this.recipeID)
      this.initForm()
    })

    // console.log(this.recipe)
  }

  initForm(){

    let recipeName = ""
    let recipePath = ""
    let recipeDescription = ""
    let ingredients = new FormArray([])

    if (this.editMode){
      this.recipe = this.recipeService.getRecipeByID(+this.recipeID)

      recipeName = this.recipe.name
      recipePath = this.recipe.imagePath
      recipeDescription = this.recipe.description

      if(this.recipe.ingredients){
        for (let ingredient of this.recipe.ingredients){
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': ingredients
    })


  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl('', Validators.required),
          'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
    )
  }

  getIngredientsControls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }



  onSubmit(){
    // console.log(this.recipeForm)

    const newRecipe = new Recipe(this.recipeID,
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients'],
    )

    console.log("===>>>>>> ",newRecipe)

    if (this.editMode){

      this.recipeService.updateRecipe(this.recipeID, newRecipe)
    }else{

      this.recipeService.addRecipe(newRecipe)

    }

    this.router.navigate(['../'], {relativeTo:this.route})

  }

  onRemoveIngredient(idx: number){

    (this.recipeForm.get('ingredients') as FormArray).removeAt(idx)

    // console.log("--------", (this.recipeForm.get('ingredients') as FormArray).controls)
    // console.log("--------", this.recipeForm.value['ingredients'])

  }





}
