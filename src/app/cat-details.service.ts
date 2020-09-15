import { Cat } from "./interfaces/cat";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
	providedIn: "root",
})
export class CatDetailsService {
	url: string = `http://localhost:3000/petfinder`;
	favoriteCats: any = [];
	constructor(private http: HttpClient) {}

	getCats = () => {
		return this.http.get(this.url);
	};

	getCatForId = (catId: number) => {
		return this.http.get<Cat>(`${this.url}/${catId}`);
	};

	getCatsForBreed = (breedName: string) => {
		return this.http.get(this.url, {
			params: {
				breed: breedName,
			},
		});
	};

	getFavoriteCats = (): number[] => {
		console.log("In service", this.favoriteCats);
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
