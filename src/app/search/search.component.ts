import { Breedcatsmatch } from "./../interfaces/breedcatsmatch";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CatBreedDetailsService } from "../cat-breed-details.service";
import { CatDetailsService } from "../cat-details.service";
import { NgForm } from "@angular/forms";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
	cats; //interface later?
	breedsToSearch: string[] = [];
	breedCatsArray: Breedcatsmatch[] = [];

	breedCatsArrFiltered: Breedcatsmatch[] = [];
	searchAge: string = "Any";
	searchGender: string = "Any";

	constructor(
		private catServ: CatDetailsService,
		private breedServ: CatBreedDetailsService,
		private route: ActivatedRoute
	) {} //pulls from petfinder API

	ngOnInit(): void {
		// this.getCats();
		this.breedsToSearch = this.breedServ.getBreedsToSearch();
		this.getCatsForBreed();
		this.breedCatsArrFiltered = this.breedCatsArray;
	}

	getCats = () => {
		this.catServ.getCats().subscribe(
			(response) => {
				console.log("Data stuff yo", response);
				this.cats = response;
			},
			(error) => {
				console.log(error.message);
			}
		);
	};

	getCatsForBreed = () => {
		this.breedsToSearch.forEach((breed) => {
			// console.log(breed);
			this.catServ.getCatsForBreed(breed).subscribe(
				(response) => {
					// console.log('cats for the breed', response);
					// let catsArr:any[] = response;
					let breedCatsMatch = { breed: breed, catsArray: response };
					this.breedCatsArray.push(breedCatsMatch);
				},
				(error) => {
					console.log(error.message);
				}
			);
		});
		console.log("cat map", this.breedCatsArray);
	};

	setSearchCriteria = (searchForm: NgForm) => {
		this.searchAge = searchForm.value.searchAge;
		this.searchGender = searchForm.value.searchGender;
		this.filterCats();
	};

	filterCats = () => {
		if (this.searchAge === "Any" && this.searchGender === "Any") {
			this.breedCatsArrFiltered = this.breedCatsArray;
		} else {
			//reset the this.breedCatsArrFiltered
			this.breedCatsArrFiltered = [];

			this.breedCatsArray.forEach((item) => {
				let filteredArray: Breedcatsmatch = item.catsArray.filter((cat) => {
					if (this.searchAge != "Any" && this.searchGender != "Any") {
						return (
							cat.age === this.searchAge && cat.gender === this.searchGender
						);
					} else if (this.searchAge != "Any") {
						return cat.age === this.searchAge;
					} else if (this.searchGender != "Any") {
						return cat.gender === this.searchGender;
					}
					return true;
				});

				// console.log("Breed: ", item.breed, "filteredArray: ", filteredArray);

				this.breedCatsArrFiltered.push({
					breed: item.breed,
					catsArray: filteredArray,
				});
			});
			console.log("After filtering: ", this.breedCatsArrFiltered);
		}
	};
}
