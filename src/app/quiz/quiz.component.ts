import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { CatBreedDetailsService } from "../cat-breed-details.service";

@Component({
	selector: "app-quiz",
	templateUrl: "./quiz.component.html",
	styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
	catBreeds: any = [];
	playfulness = "0";
	vocal = "0";
	intelligence = "0";
	adaptable = "0";
	shedding = "0";
	grooming = "0";

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

	getCatBreedDetails = (quizForm: NgForm) => {
		let playLevel = parseInt(quizForm.value.playfulness);
		let vocalLevel = parseInt(quizForm.value.vocal);
		let intelLevel = parseInt(quizForm.value.intelligence);
		let adaptLevel = parseInt(quizForm.value.adaptable);
		let shedLevel = parseInt(quizForm.value.shedding);
		let groomingLevel = parseInt(quizForm.value.grooming);

		console.log(`playLevel:${playLevel} vocalLevel:${vocalLevel} 
		intelLevel:${intelLevel} adaptLevel:${adaptLevel} shedLevel:${shedLevel} groomingLevel:${groomingLevel}`);

		let filteredBreeds = this.catBreeds.filter((breed) => {
			return (
				this.getLevelsToCheck(playLevel).includes(breed.energy_level) &&
				this.getLevelsToCheck(vocalLevel).includes(breed.vocalisation) &&
				this.getLevelsToCheck(intelLevel).includes(breed.intelligence) &&
				this.getLevelsToCheck(adaptLevel).includes(breed.adaptability) &&
				this.getLevelsToCheck(shedLevel).includes(breed.shedding_level) &&
				this.getLevelsToCheck(groomingLevel).includes(breed.grooming)
			);
		});
		console.log(filteredBreeds);
		this.catBreedService.setFilteredBreeds(filteredBreeds);
		this.router.navigate(["breed-result"]);
	};

	// utility method to get levels to check in the breed details

	getLevelsToCheck = (selectedOption: number): number[] => {
		let levelsToCheck: number[] = [];
		if (selectedOption === 0) {
			// If 'any' radio button is selected, consider all the levels
			levelsToCheck = [1, 2, 3, 4, 5];
		} else if (selectedOption === 2) {
			// If 'a little' radio button is selected, check levels 1 & 2
			levelsToCheck = [1, 2];
		} else if (selectedOption === 4) {
			// If 'More' radio button is selected, check levels 4 & 5
			levelsToCheck = [4, 5];
		} else {
			levelsToCheck.push(selectedOption); // If 'Moderate' radio button is selected, check level 3
		}
		return levelsToCheck;
	};
}
