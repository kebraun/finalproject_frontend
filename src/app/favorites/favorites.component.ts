import { Component, OnInit, Input } from "@angular/core";
import { CatDetailsService } from "../cat-details.service";
import { SearchService } from "../search.service";
import { Cat } from "../interfaces/cat";
import { Router } from "@angular/router";

@Component({
	selector: "app-favorites",
	templateUrl: "./favorites.component.html",
	styleUrls: ["./favorites.component.css"],
})
export class FavoritesComponent implements OnInit {
	@Input() deleted: Cat;
	favoriteCatIds: number[] = []; // array of favorite cat ids
	favCats: Cat[] = []; // array of cat objects

	constructor(
		private cService: CatDetailsService,
		private searchServ: SearchService,
		private router: Router
	) {}

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

	goBackToSearch = () => {
		this.router.navigate(["search"], {
			queryParams: {
				searchAge: this.searchServ.getSearchAge(),
				searchGender: this.searchServ.getSearchGender(),
				searchState: this.searchServ.getSearchState(),
			},
		});
	};
}
