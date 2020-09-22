import { Cat } from "./interfaces/cat";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
	providedIn: "root",
})
export class CatDetailsService {
	url: string = `http://localhost:3000`;
	favoriteCats: number[] = [];
	constructor(private http: HttpClient) {}

	getCats = () => {
		return this.http.get(`${this.url}/petfinder`);
	};

	getCatForId = (catId: number) => {
		return this.http.get<Cat>(`${this.url}/petfinder/${catId}`);
	};

	getCatsForBreed = (breedName: string) => {
		return this.http.get(`${this.url}/petfinder`, {
			params: {
				breed: breedName,
			},
		});
	};

	getOrganization = (orgId: string) => {
		return this.http.get(`${this.url}/organizations/${orgId}`);
	};

	getFavoriteCats = (): number[] => {
		// console.log('In service', this.favoriteCats);
		return this.favoriteCats;
	};
	// stores the favorite cat ids
	addFavoriteCat = (catId: number) => {
		this.favoriteCats.push(catId);
	};

	removeFavoriteCat = (catId: number) => {
		let deleteIndex = this.favoriteCats.findIndex((cat) => cat === catId);
		this.favoriteCats.splice(deleteIndex, 1);
		console.log("In service after removal ", this.favoriteCats);
	};
}
