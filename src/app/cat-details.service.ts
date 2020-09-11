import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
	providedIn: "root",
})
export class CatDetailsService {
	url: string = `http://localhost:3000`;
	constructor(private http: HttpClient) {}

	getCats = () => {
		return this.http.get(this.url);
	};
}
