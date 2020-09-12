import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CatBreedDetailsService } from '../cat-breed-details.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  catBreeds: any = [];
  constructor(private catBreedService: CatBreedDetailsService) {}

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

  getCatBreedDetails = (quizForm: NgForm) => {
    let playLevel = parseInt(quizForm.value.playfulness);
    // console.log(this.catBreeds[0]); //show first breed
    let filteredBreeds = this.catBreeds.filter((breed) => {
      return breed.energy_level === playLevel;
    });
    console.log(filteredBreeds);
  };
}
