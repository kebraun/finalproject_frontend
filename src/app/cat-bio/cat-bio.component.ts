import { Cat } from "./../interfaces/cat";
import { CatDetailsService } from "./../cat-details.service";
import { ActivatedRoute } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common/";

@Component({
	selector: "app-cat-bio",
	templateUrl: "./cat-bio.component.html",
	styleUrls: ["./cat-bio.component.css"],
})
export class CatBioComponent implements OnInit {
	catBio: Cat;
	catId: number;
	constructor(
		private route: ActivatedRoute,
		private catDetailsServ: CatDetailsService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getCat();
		this.getCatBio(this.catId);
	}

	getCat = () => {
		this.route.queryParamMap.subscribe((params) => {
			//console.log(params.get("cat"));
			this.catId = parseInt(params.get("cat"));
		});
	};

	getCatBio = (catId: number): any => {
		this.catDetailsServ.getCatForId(catId).subscribe((catIdResponse) => {
			this.catBio = catIdResponse;
		});
	};

	goBackPage = () => {
		this.location.back();
	};
}
