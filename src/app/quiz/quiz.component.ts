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
	allBreeds: any = [];
	toRemove: any = [
		"aege",
		"bamb",
		"cspa",
		"ctif",
		"chee",
		"cypr",
		"dons",
		"lihu",
		"khao",
		"kuri",
		"mala",
		"pixi",
		"sava",
		"srex",
	];
	playfulness = "0";
	vocal = "0";
	shedding = "0";
	sociality = "0";
	friendly = "0";
	showDivVoc = false;
	showDivShed = false;
	showDivSoc = false;
	showDivFriend = false;

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
				//console.log('Breed stuff yo', response); //show all breeds
				this.catBreeds = response;
				this.catBreeds = this.catBreeds.filter((item) => {
					return !this.toRemove.includes(item.id);
				});
				console.log("breeds", this.catBreeds);

				// this.catBreeds = response;
			},
			(error) => {
				console.log(error.message);
			}
		);
	};

	getCatBreedDetails = (quizForm: NgForm) => {
		let playLevel = parseInt(quizForm.value.playfulness);
		let vocalLevel = parseInt(quizForm.value.vocal);
		let shedLevel = parseInt(quizForm.value.shedding);
		let socialLevel = parseInt(quizForm.value.sociality);
		let friendLevel = parseInt(quizForm.value.friendly);

		console.log(`playLevel:${playLevel} vocalLevel:${vocalLevel} 
		 shedLevel:${shedLevel} socialLevel:${socialLevel} strangerLevel:${friendLevel}`);

		let filteredBreeds = this.catBreeds.filter((breed) => {
			return (
				this.getLevelsToCheck(playLevel).includes(breed.energy_level) &&
				this.getLevelsToCheck(vocalLevel).includes(breed.vocalisation) &&
				this.getLevelsToCheck(shedLevel).includes(breed.shedding_level) &&
				this.getLevelsToCheckSocial(socialLevel).includes(breed.social_needs) &&
				//for socialLevel, 3 === 3, 4 === 4, 5 === 5

				this.getLevelsToCheck(friendLevel).includes(breed.stranger_friendly)
			);
		});
		//console.log(filteredBreeds);
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

	getLevelsToCheckSocial = (selectedOption: number): number[] => {
		let levelsToCheck: number[] = [];
		if (selectedOption === 0) {
			levelsToCheck = [3, 4, 5];
		} else if (selectedOption === 3) {
			levelsToCheck = [3];
		} else if (selectedOption === 4) {
			levelsToCheck = [4];
		} else if (selectedOption === 5) {
			levelsToCheck = [5];
		}
		return levelsToCheck;
	};

	toggleDisplayVoc = () => {
		this.showDivVoc = !this.showDivVoc;
	};

	toggleDisplayShed = () => {
		this.showDivShed = !this.showDivShed;
	};

	toggleDisplaySoc = () => {
		this.showDivSoc = !this.showDivSoc;
	};

	toggleDisplayFriend = () => {
		this.showDivFriend = !this.showDivFriend;
	};
}
