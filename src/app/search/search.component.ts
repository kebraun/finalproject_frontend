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
	searchState: string = "Any";

	states: string[] = [
		"AL",
		"AK",
		"AS",
		"AZ",
		"AR",
		"CA",
		"CO",
		"CT",
		"DE",
		"DC",
		"FM",
		"FL",
		"GA",
		"GU",
		"HI",
		"ID",
		"IL",
		"IN",
		"IA",
		"KS",
		"KY",
		"LA",
		"ME",
		"MH",
		"MD",
		"MA",
		"MI",
		"MN",
		"MS",
		"MO",
		"MT",
		"NE",
		"NV",
		"NH",
		"NJ",
		"NM",
		"NY",
		"NC",
		"ND",
		"MP",
		"OH",
		"OK",
		"OR",
		"PW",
		"PA",
		"PR",
		"RI",
		"SC",
		"SD",
		"TN",
		"TX",
		"UT",
		"VT",
		"VI",
		"VA",
		"WA",
		"WV",
		"WI",
		"WY",
	];

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
					console.log("cats for the breed response", response);
					// If cats have no information other than name, skip it
					let catsArr: any[] = response;
					if (catsArr) {
						catsArr.filter((cat) => {
							return cat.age != "" && cat.gender != "";
						});
					}
					console.log("cats for the breed filtered", catsArr);
					let breedCatsMatch = { breed: breed, catsArray: catsArr };
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
		this.searchState = searchForm.value.searchState;
		console.log(
			"this.searchAge: ",
			this.searchAge,
			" this.searchGender: ",
			this.searchGender,
			" this.searchState:",
			this.searchState
		);
		this.filterCats();
	};

	filterCats = () => {
		if (
			this.searchAge === "Any" &&
			this.searchGender === "Any" &&
			this.searchState === "Any"
		) {
			this.breedCatsArrFiltered = this.breedCatsArray;
		} else {
			//reset the this.breedCatsArrFiltered
			this.breedCatsArrFiltered = [];

			this.breedCatsArray.forEach((item) => {
				let filteredArray: Breedcatsmatch = item.catsArray.filter((cat) => {
					if (this.searchState === "Any") {
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
					} else {
						if (this.searchAge != "Any" && this.searchGender != "Any") {
							return (
								cat.age === this.searchAge &&
								cat.gender === this.searchGender &&
								cat.contact["address"]["state"] === this.searchState
							);
						} else if (this.searchAge != "Any") {
							return (
								cat.age === this.searchAge &&
								cat.contact["address"]["state"] === this.searchState
							);
						} else if (this.searchGender != "Any") {
							return (
								cat.gender === this.searchGender &&
								cat.contact["address"]["state"] === this.searchState
							);
						} else {
							return cat.contact["address"]["state"] === this.searchState;
						}
					}
				});

				this.breedCatsArrFiltered.push({
					breed: item.breed,
					catsArray: filteredArray,
				});
			});
			// console.log("After filtering: ", this.breedCatsArrFiltered);
		}
	};
}
