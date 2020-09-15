import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CatCardComponent } from './cat-card/cat-card.component';
import { SearchComponent } from './search/search.component';
import { CatBioComponent } from './cat-bio/cat-bio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { BreedResultComponent } from './breed-result/breed-result.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CatCardComponent,
    SearchComponent,
    CatBioComponent,
    NotFoundComponent,
    QuizComponent,
    AboutComponent,
    UserInfoComponent,
    BreedResultComponent,
    FavoritesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
