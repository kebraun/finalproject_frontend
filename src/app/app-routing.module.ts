import { AboutComponent } from "./about/about.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { CatBioComponent } from "./cat-bio/cat-bio.component";
import { SearchComponent } from "./search/search.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { QuizComponent } from "./quiz/quiz.component";
import { UserInfoComponent } from "./user-info/user-info.component";

const routes: Routes = [
	{ path: "home", component: HomeComponent },
	{ path: "search", component: SearchComponent },
	{ path: "cat-bio", component: CatBioComponent },
	{ path: "quiz", component: QuizComponent },
	{ path: "user-info", component: UserInfoComponent },
	{ path: "not-found", component: NotFoundComponent },
	{ path: "about", component: AboutComponent },
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "**", component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
