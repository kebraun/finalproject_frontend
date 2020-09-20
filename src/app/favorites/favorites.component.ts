import { Component, OnInit, Input } from "@angular/core";
import { CatDetailsService } from "../cat-details.service";
import { Cat } from "../interfaces/cat";

@Component({
	selector: "app-favorites",
	templateUrl: "./favorites.component.html",
	styleUrls: ["./favorites.component.css"],
})
export class FavoritesComponent implements OnInit {
	@Input() deleted: Cat;
	favoriteCatIds: number[] = []; // array of favorite cat ids
	favCats: Cat[] = []; // array of cat objects

	constructor(private cService: CatDetailsService) {}

	ngOnInit(): void {
		console.log("On favorites");
		this.favoriteCatIds = this.cService.getFavoriteCats();
		this.getCatsDetails(this.favoriteCatIds);
	}

	getCatsDetails = (favCatsIDs: number[]) => {
		favCatsIDs.forEach((catId) => {
			this.cService.getCatForId(catId).subscribe(
				(response) => {
					let cat: Cat = response;
					cat.isFavorite = true;
					this.favCats.push(cat);
				},
				(error) => {
					console.log(error.message);
				}
			);

			//this.favCats.push(cat);
		});
	};

	delete = (index: number) => {
		this.cService.removeFavoriteCat(this.favCats[index].id); // remove from the service array
		this.favCats.splice(index, 1); // rempve from the component array
	};
}
