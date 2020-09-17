import { Breedcatsmatch } from "./../interfaces/breedcatsmatch";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CatBreedDetailsService } from "../cat-breed-details.service";
import { CatDetailsService } from "../cat-details.service";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
	cats; //interface later?
	breedsToSearch: string[] = [];
	breedCatsArray: Breedcatsmatch[] = [];

	constructor(
		private catServ: CatDetailsService,
		private breedServ: CatBreedDetailsService,
		private route: ActivatedRoute
	) {} //pulls from petfinder API

	ngOnInit(): void {
		// this.getCats();
		this.breedsToSearch = this.breedServ.getBreedsToSearch();
		this.getCatsForBreed();
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
}
