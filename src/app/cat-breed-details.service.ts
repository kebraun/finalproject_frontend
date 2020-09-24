import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class CatBreedDetailsService {
	url: string = `https://api.thecatapi.com/v1/breeds`;
	// `https://api.thecatapi.com/v1/breeds?energy_level=5`

	filteredBreeds: any[] = [];
	breedsToSearch: any[] = [];

	constructor(private http: HttpClient) {}

	getCatBreedDetails = () => {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
				"x-api-key": `469b0948-9c24-47ae-a23a-3a2c13f8d2bc`,
			}),
		};

		return this.http.get(this.url, httpOptions);
	};

	setFilteredBreeds = (filteredBreeds) => {
		//add type
		this.filteredBreeds = filteredBreeds;
	};

	getFilteredBreeds = () => {
		return this.filteredBreeds;
	};

	getBreedDetails = (breedName: string): any => {
		return this.filteredBreeds.find((breed) => {
			return breed.name === breedName;
		});
	};

	setBreedsToSearch = (breedsToSearch: string[]) => {
		this.breedsToSearch = breedsToSearch;
	};

	getBreedsToSearch = () => {
		return this.breedsToSearch;
	};
}
