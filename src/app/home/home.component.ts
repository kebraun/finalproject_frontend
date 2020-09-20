import { Component, OnInit } from "@angular/core";
import { CatDetailsService } from "../cat-details.service";
import { CatBreedDetailsService } from "../cat-breed-details.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	catBreeds: any = [];
	constructor(
		private catServ: CatDetailsService,
		private breedService: CatBreedDetailsService
	) {}
	cats: any;
	ngOnInit(): void {}
}
