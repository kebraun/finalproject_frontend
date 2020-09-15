import { ActivatedRoute, Router } from "@angular/router";
import { CatDetailsService } from "./../cat-details.service";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { VisitorService } from "../visitor.service";
import { Visitor } from "../interfaces/visitor";

@Component({
	selector: "app-cat-card",
	templateUrl: "./cat-card.component.html",
	styleUrls: ["./cat-card.component.css"],
})
export class CatCardComponent implements OnInit {
	@Input() catRef;
	@Output() deleted = new EventEmitter<void>();

	constructor(private router: Router, private cService: CatDetailsService) {}

	ngOnInit(): void {}

	showCatBio = (catId: number) => {
		// this.router.navigate(['search'], {

		this.router.navigate(["cat-bio"], {
			queryParams: {
				cat: catId,
			},
		});
	};

	addToFavorites = (catId: number) => {
		this.cService.addFavoriteCat(catId);
		console.log("Added ", this.cService.getFavoriteCats());
	};

	delete = () => {
		this.deleted.emit();
	};
}
