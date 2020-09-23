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
	catBio: Cat = null;
	catId: number;
	orgInfo: any;
	orgId: string;
	constructor(
		private route: ActivatedRoute,
		private catDetailsServ: CatDetailsService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getCat();
		this.getCatBio(this.catId);
		this.getOrg();
		this.getOrgName(this.orgId);
	}

	getCat = () => {
		this.route.queryParamMap.subscribe((params) => {
			//console.log(params.get("cat"));
			this.catId = parseInt(params.get("cat"));
		});
	};

	getCatBio = (catId: number): any => {
		this.catDetailsServ.getCatForId(catId).subscribe(
			(catIdResponse) => {
				this.catBio = catIdResponse;
				console.log("catBio============", this.catBio);
				if (catIdResponse.description.indexOf("&") != -1) {
					this.catBio.description = this.decodeHtmlCharCodes(
						catIdResponse.description
					);
					console.log("In here ", this.catBio.description);
				}
			},
			(error) => {
				console.log(error.message);
			}
		);
	};

	getOrg = () => {
		this.route.queryParamMap.subscribe((params) => {
			this.orgId = params.get("org");
		});
	};

	getOrgName = (orgId: string) => {
		this.catDetailsServ.getOrganization(orgId).subscribe(
			(organizationResponse) => {
				this.orgInfo = organizationResponse;
			},
			(error) => {
				console.log(error.message);
			}
		);
	};

	goBackPage = () => {
		this.location.back();
	};

	decodeHtmlCharCodes = (str: string) => {
		if (str.indexOf("&amp;") != -1) {
			str = str.replace(/(&amp;)/gi, "&");
		}

		let newStr = str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
			String.fromCharCode(charCode)
		);

		return newStr;
	};
}
