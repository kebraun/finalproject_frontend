import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CatBreedDetailsService } from '../cat-breed-details.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  // @Output() submit = new EventEmitter<any>();

  catBreeds: any = [];

  constructor(
    private catBreedService: CatBreedDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.catBreeds = this.getAllBreeds();
  }

  getBreeds = () => {
    this.catBreedService.getCatBreedDetails();
  };

  getAllBreeds = () => {
    this.catBreedService.getCatBreedDetails().subscribe(
      (response) => {
        // console.log('Breed stuff yo', response); //show all breeds
        this.catBreeds = response;
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  getSelectedOptions = (options: any) => {
    let selectedOptions: number[] = [];
    for (const [key, value] of Object.entries(options)) {
      // console.log(`${key}: ${value}`);
      if (value) {
        console.log(`pushed ${key}: ${value}`);
        selectedOptions.push(parseInt(key));
      }
    }
    return selectedOptions;
  };
  getCatBreedDetails = (quizForm: NgForm) => {
    let playLevel = parseInt(quizForm.value.playfulness);
    let vocalLevel = parseInt(quizForm.value.vocal);
    let shedLevelArr: number[] = this.getSelectedOptions(
      quizForm.value.shedding
    );
    console.log('shed level', shedLevelArr);
    // console.log(this.catBreeds[0]); //show first breed
    let filteredBreeds = this.catBreeds.filter((breed) => {
      return (
        breed.energy_level === playLevel &&
        breed.vocalisation === vocalLevel &&
        shedLevelArr.includes(breed.shedding_level)
      );
    });
    console.log(filteredBreeds);
    this.catBreedService.setFilteredBreeds(filteredBreeds);
    this.router.navigate(['breed-result']);
  };
}
