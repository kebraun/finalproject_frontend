import { Injectable } from "@angular/core";
import { Breedcatsmatch } from "./interfaces/breedcatsmatch";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	searchAge: string = "Any";
	searchGender: string = "Any";
	searchState: string = "Any";
	catsPerBreed: Breedcatsmatch[] = [];
	filteredCatsPerBreed: Breedcatsmatch[] = [];

	constructor() {}

	setSearchOptions = (
		srchAge: string,
		srchGender: string,
		srchState: string,
		filteredArr: Breedcatsmatch[]
	): void => {
		this.searchAge = srchAge;
		this.searchGender = srchGender;
		this.searchState = srchState;
		this.filteredCatsPerBreed = filteredArr;
		console.log(
			"this.searchAge: ",
			this.searchAge,
			" this.searchGender: ",
			this.searchGender,
			" this.searchState:",
			this.searchState
		);
	};

	getSearchAge = (): string => {
		return this.searchAge;
	};

	getSearchGender = (): string => {
		return this.searchGender;
	};

	getSearchState = (): string => {
		return this.searchState;
	};

	setCatsPerBreed = (catsPerBreed: Breedcatsmatch[]): void => {
		this.catsPerBreed = catsPerBreed;
	};

	getCatsPerBreed = (): Breedcatsmatch[] => {
		return this.catsPerBreed;
	};

	getFilteredCatsAfterSrch = () => {
		return this.filteredCatsPerBreed;
	};
}
