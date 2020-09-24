import { Component, OnInit } from "@angular/core";
import { CatDetailsService } from "../cat-details.service";
import { CatBreedDetailsService } from "../cat-breed-details.service";
import { SearchService } from "../search.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	catBreeds: any = [];
	constructor(private searchServ: SearchService) {}
	cats: any;
	ngOnInit(): void {
		//reset the breedcats array
		this.searchServ.setCatsPerBreed([]);
	}
}
