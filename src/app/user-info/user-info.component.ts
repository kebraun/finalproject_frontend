import { Component, OnInit } from "@angular/core";
import { VisitorService } from "../visitor.service";
import { NgForm } from "@angular/forms";
import { Visitor } from "../interfaces/visitor";

@Component({
	selector: "app-user-info",
	templateUrl: "./user-info.component.html",
	styleUrls: ["./user-info.component.css"],
})
export class UserInfoComponent implements OnInit {
	constructor(private service: VisitorService) {}

	ngOnInit(): void {}

	addUserFavorites = (vForm: NgForm) => {
		// 1. add the user
		let currentUser: Visitor = this.addUser(vForm);
		// 2. add the favorite cats for that visitor_id
	};

	addUser = (vForm: NgForm): Visitor => {
		let vInfo: Visitor = {
			visitor_id: 0,
			visitor_email: vForm.value.email,
			visitor_password: vForm.value.password,
			visitor_fname: null,
			visitor_lname: null,
		};

		return this.service.addNewVisitor(vInfo);
	};
}
