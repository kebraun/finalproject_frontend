import { Breedcatsmatch } from "./../interfaces/breedcatsmatch";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CatBreedDetailsService } from "../cat-breed-details.service";
import { CatDetailsService } from "../cat-details.service";
import { NgForm } from "@angular/forms";
import { SearchService } from "../search.service";

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
	cats;
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
		private searchServ: SearchService,
		private route: ActivatedRoute
	) {} //pulls from petfinder API

	ngOnInit(): void {
		// this.getCats();
		this.breedsToSearch = this.breedServ.getBreedsToSearch();
		if (this.searchServ.getCatsPerBreed().length == 0) {
			this.getCatsForBreed();
		} else {
			this.breedCatsArray = this.searchServ.getCatsPerBreed();
		}

		if (this.searchServ.getFilteredCatsAfterSrch().length == 0) {
			this.breedCatsArrFiltered = this.breedCatsArray;
		} else {
			this.breedCatsArrFiltered = this.searchServ.getFilteredCatsAfterSrch();
		}
		this.getSearchOptions();
	}

	getCats = (): void => {
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

	getSearchOptions = (): void => {
		this.route.queryParamMap.subscribe((params) => {
			//console.log("In search component", params.keys);
			if (params.keys.length > 0) {
				this.searchAge = params.get("searchAge");
				this.searchGender = params.get("searchGender");
				this.searchState = params.get("searchState");
				console.log(
					`Getting the search options from query params ${this.searchAge}, ${this.searchGender}, ${this.searchState}`
				);
			} else {
				this.searchAge = this.searchServ.getSearchAge()
					? this.searchServ.getSearchAge()
					: "Any";
				this.searchGender = this.searchServ.getSearchGender()
					? this.searchServ.getSearchGender()
					: "Any";
				this.searchState = this.searchServ.getSearchState()
					? this.searchServ.getSearchState()
					: "Any";
				console.log(
					`Getting the search options from service ${this.searchAge}, ${this.searchGender}, ${this.searchState}`
				);
			}
		});
	};

	getCatsForBreed = (): void => {
		if (this.breedCatsArray.length == 0) {
			this.breedsToSearch.forEach((breed) => {
				let breedDetails = this.breedServ.getBreedDetails(breed);
				console.log("breed temperament ", breedDetails.temperament);

				this.catServ.getCatsForBreed(breed).subscribe(
					(response) => {
						// console.log("cats for the breed response", response);
						// If cats have no information other than name, skip it
						let catsArr: any[] = response;
						if (catsArr) {
							catsArr.filter((cat) => {
								return cat.age != "" && cat.gender != "";
							});
						}
						// console.log("cats for the breed filtered", catsArr);
						let breedCatsMatch: Breedcatsmatch = {
							breed: breed,
							breedTemperament: breedDetails.temperament,
							catsArray: catsArr,
						};
						this.breedCatsArray.push(breedCatsMatch);
					},
					(error) => {
						console.log(error.message);
					}
				);
			});
		}
		console.log("cat map", this.breedCatsArray);
		this.searchServ.setCatsPerBreed(this.breedCatsArray);
	};

	filterCats = (searchForm: NgForm): void => {
		this.searchAge = searchForm.value.searchAge;
		this.searchGender = searchForm.value.searchGender;
		this.searchState = searchForm.value.searchState;

		if (
			this.searchAge === "Any" &&
			this.searchGender === "Any" &&
			this.searchState === "Any"
		) {
			this.breedCatsArrFiltered = this.searchServ.getCatsPerBreed();
		} else {
			//reset the this.breedCatsArrFiltered
			this.breedCatsArrFiltered = [];

			this.breedCatsArray.forEach((item) => {
				if (item.catsArray) {
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
						breedTemperament: item.breedTemperament,
						catsArray: filteredArray,
					});
				} else {
					this.breedCatsArrFiltered.push(item);
				}
			});
			// set this in service to access later on favorites page
			this.searchServ.setSearchOptions(
				this.searchAge,
				this.searchGender,
				this.searchState,
				this.breedCatsArrFiltered
			);
			console.log("After filtering: ", this.breedCatsArrFiltered);
		}
	};
}
