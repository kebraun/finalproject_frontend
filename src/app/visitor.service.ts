import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Visitor } from "./interfaces/visitor";

@Injectable({
	providedIn: "root",
})
export class VisitorService {
	url: string = `http://localhost:3000`;
	currentVisitor: Visitor = null;
	favoriteCats: number[] = [];

	constructor(private http: HttpClient) {}

	addNewVisitor = (visitorInfo: Visitor) => {
		this.http.post<Visitor>(`${this.url}/visitors`, visitorInfo).subscribe(
			(response) => {
				this.currentVisitor = <Visitor>response;
				console.log("In service: addNewVisitor() : ", this.currentVisitor);
			},
			(error) => {
				console.log("Error has occurred", error.message);
			}
		);
	};

	getRecentVisitor = () => {
		return this.currentVisitor;
	};

	addVisitorFavorites = (favoritesInfo: any) => {
		return this.http.post(
			`${this.url}/favorites/${favoritesInfo.visitor_id}`,
			favoritesInfo.favorite_cats
		);
	};

	getVisitorFavorites = (visitor_id: number) => {
		return this.http.get<number[]>(`${this.url}/favorites/${visitor_id}`);
	};

	updateVisitorFavorites = (favoritesInfo: any) => {
		return this.http.put(
			`${this.url}/favorites/${favoritesInfo.visitor_id}`,
			favoritesInfo.favorite_cats
		);
	};
}
